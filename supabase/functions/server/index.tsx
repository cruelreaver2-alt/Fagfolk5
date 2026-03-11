import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "npm:@supabase/supabase-js";
import { Resend } from "npm:resend";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS
app.use("/*", cors({
  origin: "*",
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  exposeHeaders: ["Content-Length"],
  maxAge: 600,
}));

// Health check
app.get("/make-server-8d200dba/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ==========================================
// AUTHENTICATION
// ==========================================

// Helper: Validate certifications based on category
function validateCertifications(category: string, certifications: any[]): { valid: boolean; missing: string[]; status: string } {
  const getRequiredTypes = (cat: string): string[] => {
    const base = ["insurance", "org_number"];
    
    switch (cat) {
      case "elektro":
        return [...base, "dsb_registration", "electrician_certificate"];
      case "ror":
        return [...base, "plumber_approval", "plumber_certificate"];
      case "tre":
        return [...base]; // Fagbrev optional for tømrer
      case "tak":
        return [...base, "fall_protection"]; // HMS-kort obligatorisk
      case "maling":
        return [...base]; // Fagbrev optional
      default:
        return base;
    }
  };
  
  const typeNames: Record<string, string> = {
    insurance: "Ansvarsforsikring",
    org_number: "Organisasjonsnummer",
    dsb_registration: "DSB Elvirksomhetsregistrering",
    electrician_certificate: "Fagbrev elektriker",
    plumber_approval: "Kommunal godkjenning rørlegger",
    plumber_certificate: "Fagbrev rørlegger",
    fall_protection: "HMS-kort / Fallsikring",
  };

  const requiredTypes = getRequiredTypes(category);
  const uploadedTypes = certifications
    .filter(cert => cert.status === "uploaded" || cert.status === "verified")
    .map(cert => cert.type);

  const missingTypes = requiredTypes.filter(type => !uploadedTypes.includes(type));
  const missingNames = missingTypes.map(type => typeNames[type] || type);
  
  // Auto-approve if all required certifications are uploaded
  if (missingTypes.length === 0) {
    return { valid: true, missing: [], status: "approved" };
  }
  
  // Auto-reject if critical certifications are missing
  return { valid: false, missing: missingNames, status: "rejected" };
}

app.post("/make-server-8d200dba/auth/signup", async (c) => {
  try {
    const { email, password, name, role, company, category, certifications, orgNumber, phone } = await c.req.json();
    if (!email || !password || !name || !role) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
    );

    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email, password,
      user_metadata: { name, role, company: company || null },
      email_confirm: true,
    });

    if (authError) {
      return c.json({ error: authError.message }, 400);
    }

    const userId = authData.user.id;
    
    // Supplier profile with certification validation
    if (role === "supplier" || role === "leverandor") {
      const certsArray = certifications || [];
      const validation = validateCertifications(category || "", certsArray);
      
      const profile = {
        id: userId,
        name,
        company: company || name,
        email,
        phone: phone || "",
        orgNumber: orgNumber || "",
        category: category || "",
        verified: validation.status === "approved",
        verificationStatus: validation.status, // "approved" or "rejected"
        rejectionReason: validation.missing.length > 0 
          ? `Mangler obligatoriske sertifiseringer: ${validation.missing.join(", ")}`
          : null,
        certifications: certsArray,
        memberSince: new Date().getFullYear().toString(),
        completedJobs: 0,
        rating: 0,
        reviewCount: 0,
        responseTime: "Ny",
        responseRate: 0,
        categories: category ? [category] : [],
        createdAt: new Date().toISOString(),
        lastVerified: validation.status === "approved" ? new Date().toISOString() : null,
      };

      await kv.set(`supplier-profile:${userId}`, profile);
      
      return c.json({
        user: authData.user,
        message: validation.status === "approved" 
          ? "Kontoen er opprettet og godkjent! Du kan nå motta jobber."
          : "Kontoen er opprettet, men mangler obligatoriske sertifiseringer.",
        verificationStatus: validation.status,
        missing: validation.missing,
        profile,
      });
    }
    
    // Customer profile
    const profile = {
      id: userId, name, email, memberSince: new Date().getFullYear().toString(),
      emailVerified: true, totalRequests: 0, activeRequests: 0, completedRequests: 0,
      createdAt: new Date().toISOString(),
    };

    await kv.set(`customer-profile:${userId}`, profile);
    return c.json({ user: authData.user, message: "User created successfully" });
  } catch (error) {
    return c.json({ error: String(error) }, 500);
  }
});

app.post("/make-server-8d200dba/auth/signin", async (c) => {
  try {
    const { email, password } = await c.req.json();
    if (!email || !password) {
      return c.json({ error: "Missing email or password" }, 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_ANON_KEY') || '',
    );

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return c.json({ error: error.message }, 401);
    }

    return c.json({ session: data.session, user: data.user });
  } catch (error) {
    return c.json({ error: String(error) }, 500);
  }
});

// ==========================================
// JOBS
// ==========================================

app.post("/make-server-8d200dba/jobs", async (c) => {
  try {
    const job = await c.req.json();
    const jobId = `job-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const newJob = { ...job, id: jobId, createdAt: new Date().toISOString(), status: "open" };
    await kv.set(`job:${jobId}`, newJob);
    return c.json({ job: newJob });
  } catch (error) {
    return c.json({ error: String(error) }, 500);
  }
});

app.get("/make-server-8d200dba/jobs", async (c) => {
  try {
    const jobs = await kv.getByPrefix("job:");
    return c.json({ jobs });
  } catch (error) {
    return c.json({ error: String(error) }, 500);
  }
});

app.get("/make-server-8d200dba/jobs/:id", async (c) => {
  try {
    const job = await kv.get(`job:${c.req.param("id")}`);
    if (!job) return c.json({ error: "Job not found" }, 404);
    return c.json({ job });
  } catch (error) {
    return c.json({ error: String(error) }, 500);
  }
});

// Alias for /requests (legacy support)
app.post("/make-server-8d200dba/requests", async (c) => {
  try {
    const job = await c.req.json();
    const jobId = `job-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const newJob = { ...job, id: jobId, createdAt: new Date().toISOString(), status: "open" };
    await kv.set(`job:${jobId}`, newJob);
    return c.json({ request: newJob });
  } catch (error) {
    return c.json({ error: String(error) }, 500);
  }
});

app.get("/make-server-8d200dba/requests", async (c) => {
  try {
    const jobs = await kv.getByPrefix("job:");
    
    // Filter by customerId if provided
    const customerId = c.req.query("customerId");
    if (customerId) {
      const filtered = jobs.filter((job: any) => job.customerId === customerId);
      return c.json({ requests: filtered });
    }
    
    return c.json({ requests: jobs });
  } catch (error) {
    return c.json({ error: String(error) }, 500);
  }
});

app.get("/make-server-8d200dba/requests/:id", async (c) => {
  try {
    const job = await kv.get(`job:${c.req.param("id")}`);
    if (!job) return c.json({ error: "Request not found" }, 404);
    return c.json({ request: job });
  } catch (error) {
    return c.json({ error: String(error) }, 500);
  }
});

// ==========================================
// OFFERS
// ==========================================

app.post("/make-server-8d200dba/offers", async (c) => {
  try {
    const body = await c.req.json();
    const { jobId, supplierId, price, description, duration, customerEmail, customerName, supplierName } = body;
    if (!jobId || !supplierId || !price) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const offerId = `offer-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const newOffer = {
      id: offerId, jobId, supplierId, price,
      description: description || "", duration: duration || "",
      materials: body.materials || [], status: "pending",
      createdAt: new Date().toISOString(),
    };
    await kv.set(`offer:${offerId}`, newOffer);

    // Create notification
    if (body.customerId) {
      const notificationId = `notification-${Date.now()}-${Math.random().toString(36).substring(7)}`;
      await kv.set(`notification:customer:${body.customerId}:${notificationId}`, {
        id: notificationId, userId: body.customerId, type: "offer_received",
        title: "Nytt tilbud mottatt",
        message: `${supplierName || "En håndverker"} har sendt deg et tilbud på ${price} kr`,
        read: false, createdAt: new Date().toISOString(), relatedId: offerId,
      });
      
      // Send email notification if customer email is provided
      if (customerEmail) {
        const emailHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #17384E; color: white; padding: 20px; text-align: center; }
                .content { background-color: #f8f9fa; padding: 30px; }
                .button { display: inline-block; background-color: #E07B3E; color: white; padding: 12px 24px; 
                          text-decoration: none; border-radius: 5px; margin-top: 20px; }
                .footer { text-align: center; padding: 20px; color: #6B7280; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>🎉 Nytt tilbud mottatt!</h1>
                </div>
                <div class="content">
                  <p>Hei ${customerName || 'der'},</p>
                  <p><strong>${supplierName || 'En håndverker'}</strong> har sendt deg et tilbud:</p>
                  <ul>
                    <li><strong>Pris:</strong> ${price.toLocaleString('nb-NO')} kr</li>
                    ${duration ? `<li><strong>Varighet:</strong> ${duration}</li>` : ''}
                    ${description ? `<li><strong>Beskrivelse:</strong> ${description}</li>` : ''}
                  </ul>
                  <p>Logg inn for å se hele tilbudet og godta eller avslå det.</p>
                  <a href="https://handverkeren.no/kundedashboard" class="button">Se tilbud</a>
                </div>
                <div class="footer">
                  <p>© 2026 Håndverkeren - Din pålitelige håndverkerplattform</p>
                </div>
              </div>
            </body>
          </html>
        `;
        
        await sendEmail(
          customerEmail,
          `Nytt tilbud fra ${supplierName || 'en håndverker'}`,
          emailHtml
        );
      }
    }

    return c.json({ offer: newOffer, success: true });
  } catch (error) {
    return c.json({ error: String(error) }, 500);
  }
});

app.get("/make-server-8d200dba/jobs/:jobId/offers", async (c) => {
  try {
    const allOffers = await kv.getByPrefix("offer:");
    const jobOffers = allOffers.filter((o: any) => o.jobId === c.req.param("jobId"));
    return c.json({ offers: jobOffers });
  } catch (error) {
    return c.json({ error: String(error) }, 500);
  }
});

// Accept or reject an offer
app.put("/make-server-8d200dba/offers/:offerId/status", async (c) => {
  try {
    const { status, customerId } = await c.req.json();
    
    if (!status || !["accepted", "rejected"].includes(status)) {
      return c.json({ error: "Invalid status. Must be 'accepted' or 'rejected'" }, 400);
    }

    const offer = await kv.get(`offer:${c.req.param("offerId")}`);
    if (!offer) {
      return c.json({ error: "Offer not found" }, 404);
    }

    // Update offer status
    offer.status = status;
    offer.updatedAt = new Date().toISOString();
    await kv.set(`offer:${c.req.param("offerId")}`, offer);

    // If accepted, update job status and notify supplier
    if (status === "accepted") {
      const job = await kv.get(`job:${offer.jobId}`);
      if (job) {
        job.status = "accepted";
        job.acceptedOfferId = offer.id;
        await kv.set(`job:${offer.jobId}`, job);
      }

      // Notify supplier
      const notificationId = `notification-${Date.now()}-${Math.random().toString(36).substring(7)}`;
      await kv.set(`notification:${offer.supplierId}:${notificationId}`, {
        id: notificationId,
        userId: offer.supplierId,
        type: "offer_accepted",
        title: "Tilbud akseptert! 🎉",
        message: "Kunden har akseptert ditt tilbud",
        read: false,
        createdAt: new Date().toISOString(),
        relatedId: offer.id,
      });
    }

    return c.json({ offer, success: true });
  } catch (error) {
    console.error("Error updating offer status:", error);
    return c.json({ error: String(error) }, 500);
  }
});

// Mark job as completed
app.put("/make-server-8d200dba/jobs/:jobId/complete", async (c) => {
  try {
    const { customerId } = await c.req.json();
    
    const job = await kv.get(`job:${c.req.param("jobId")}`);
    if (!job) {
      return c.json({ error: "Job not found" }, 404);
    }

    // Only customer who created the job can mark it as completed
    if (job.customerId !== customerId) {
      return c.json({ error: "Unauthorized" }, 403);
    }

    // Update job status
    job.status = "completed";
    job.completedAt = new Date().toISOString();
    await kv.set(`job:${c.req.param("jobId")}`, job);

    // Get accepted offer to find supplier
    if (job.acceptedOfferId) {
      const offer = await kv.get(`offer:${job.acceptedOfferId}`);
      if (offer) {
        // Notify supplier
        const notificationId = `notification-${Date.now()}-${Math.random().toString(36).substring(7)}`;
        await kv.set(`notification:${offer.supplierId}:${notificationId}`, {
          id: notificationId,
          userId: offer.supplierId,
          type: "job_completed",
          title: "Jobb fullført ✅",
          message: "Kunden har markert jobben som fullført",
          read: false,
          createdAt: new Date().toISOString(),
          relatedId: job.id,
        });

        // Update supplier stats
        const supplier = await kv.get(`supplier-profile:${offer.supplierId}`);
        if (supplier) {
          supplier.completedJobs = (supplier.completedJobs || 0) + 1;
          await kv.set(`supplier-profile:${offer.supplierId}`, supplier);
        }
      }
    }

    return c.json({ job, success: true });
  } catch (error) {
    console.error("Error completing job:", error);
    return c.json({ error: String(error) }, 500);
  }
});

// ==========================================
// NOTIFICATIONS
// ==========================================

app.get("/make-server-8d200dba/notifications/:userId", async (c) => {
  try {
    const notifications = await kv.getByPrefix(`notification:customer:${c.req.param("userId")}:`);
    notifications.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return c.json({ notifications });
  } catch (error) {
    return c.json({ error: String(error) }, 500);
  }
});

app.put("/make-server-8d200dba/notifications/:notificationId/read", async (c) => {
  try {
    const { userId } = await c.req.json();
    const key = `notification:customer:${userId}:${c.req.param("notificationId")}`;
    const notification = await kv.get(key);
    if (!notification) return c.json({ error: "Not found" }, 404);
    const updated = { ...notification, read: true };
    await kv.set(key, updated);
    return c.json({ notification: updated });
  } catch (error) {
    return c.json({ error: String(error) }, 500);
  }
});

// ==========================================
// PROFILES
// ==========================================

app.get("/make-server-8d200dba/suppliers/:id", async (c) => {
  try {
    const supplier = await kv.get(`supplier-profile:${c.req.param("id")}`);
    if (!supplier) return c.json({ error: "Not found" }, 404);
    return c.json({ supplier });
  } catch (error) {
    return c.json({ error: String(error) }, 500);
  }
});

app.get("/make-server-8d200dba/customers/:id", async (c) => {
  try {
    const customer = await kv.get(`customer-profile:${c.req.param("id")}`);
    if (!customer) return c.json({ error: "Not found" }, 404);
    return c.json({ customer });
  } catch (error) {
    return c.json({ error: String(error) }, 500);
  }
});

app.put("/make-server-8d200dba/suppliers/:id", async (c) => {
  try {
    const updates = await c.req.json();
    const existing = await kv.get(`supplier-profile:${c.req.param("id")}`);
    if (!existing) return c.json({ error: "Not found" }, 404);
    const updated = { ...existing, ...updates, id: c.req.param("id") };
    await kv.set(`supplier-profile:${c.req.param("id")}`, updated);
    return c.json({ supplier: updated });
  } catch (error) {
    return c.json({ error: String(error) }, 500);
  }
});

// ==========================================
// REVIEWS
// ==========================================

app.post("/make-server-8d200dba/reviews", async (c) => {
  try {
    const { supplierId, customerId, rating, comment, jobId } = await c.req.json();
    if (!supplierId || !customerId || !rating) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const reviewId = `review:${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const review = {
      id: reviewId, supplierId, customerId, rating,
      comment: comment || "", jobId: jobId || null,
      createdAt: new Date().toISOString(),
    };
    await kv.set(reviewId, review);

    // Update supplier rating
    const allReviews = await kv.getByPrefix("review:");
    const supplierReviews = allReviews.filter((r: any) => r.supplierId === supplierId);
    const avgRating = supplierReviews.reduce((sum: number, r: any) => sum + r.rating, 0) / supplierReviews.length;
    const supplier = await kv.get(`supplier-profile:${supplierId}`);
    if (supplier) {
      supplier.rating = avgRating;
      supplier.reviewCount = supplierReviews.length;
      await kv.set(`supplier-profile:${supplierId}`, supplier);
    }

    return c.json({ review });
  } catch (error) {
    return c.json({ error: String(error) }, 500);
  }
});

app.get("/make-server-8d200dba/reviews", async (c) => {
  try {
    const supplierId = c.req.query("supplierId");
    if (!supplierId) return c.json({ error: "supplierId required" }, 400);
    const allReviews = await kv.getByPrefix("review:");
    const supplierReviews = allReviews.filter((r: any) => r.supplierId === supplierId);
    supplierReviews.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return c.json({ reviews: supplierReviews });
  } catch (error) {
    return c.json({ error: String(error) }, 500);
  }
});

// ==========================================
// MESSAGES
// ==========================================

// Send a message
app.post("/make-server-8d200dba/messages", async (c) => {
  try {
    const { requestId, senderId, receiverId, content, senderRole } = await c.req.json();
    
    if (!requestId || !senderId || !receiverId || !content) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const messageId = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const message = {
      id: messageId,
      requestId,
      senderId,
      receiverId,
      content,
      senderRole,
      createdAt: new Date().toISOString(),
      read: false,
    };

    await kv.set(`message:${requestId}:${messageId}`, message);

    // Create notification for receiver
    const notificationId = `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const senderProfile = senderRole === "supplier" 
      ? await kv.get(`supplier-profile:${senderId}`)
      : await kv.get(`customer-profile:${senderId}`);
    
    const senderName = senderProfile?.name || senderProfile?.company || "En bruker";
    
    await kv.set(`notification:${receiverId}:${notificationId}`, {
      id: notificationId,
      userId: receiverId,
      type: "new_message",
      title: "Ny melding",
      message: `${senderName} sendte deg en melding`,
      read: false,
      createdAt: new Date().toISOString(),
      relatedId: requestId,
    });

    return c.json({ message, success: true });
  } catch (error) {
    console.error("Error sending message:", error);
    return c.json({ error: String(error) }, 500);
  }
});

// Get messages for a request
app.get("/make-server-8d200dba/messages/:requestId", async (c) => {
  try {
    const requestId = c.params.requestId;
    const userId = c.req.query("userId");
    
    const allMessages = await kv.getByPrefix(`message:${requestId}:`);
    
    // Sort by createdAt
    allMessages.sort((a: any, b: any) => 
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    // Mark messages as read if userId is the receiver
    if (userId) {
      for (const msg of allMessages) {
        if (msg.receiverId === userId && !msg.read) {
          msg.read = true;
          await kv.set(`message:${requestId}:${msg.id}`, msg);
        }
      }
    }

    return c.json({ messages: allMessages });
  } catch (error) {
    console.error("Error loading messages:", error);
    return c.json({ error: String(error) }, 500);
  }
});

// Get all conversations for a user
app.get("/make-server-8d200dba/conversations/:userId", async (c) => {
  try {
    const userId = c.params.userId;
    const allMessages = await kv.getByPrefix("message:");
    
    // Group messages by requestId
    const conversationsMap = new Map();
    
    for (const msg of allMessages) {
      if (msg.senderId === userId || msg.receiverId === userId) {
        if (!conversationsMap.has(msg.requestId)) {
          conversationsMap.set(msg.requestId, []);
        }
        conversationsMap.get(msg.requestId).push(msg);
      }
    }

    // Build conversation objects
    const conversations = [];
    for (const [requestId, messages] of conversationsMap.entries()) {
      const sortedMessages = messages.sort((a: any, b: any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      
      const lastMessage = sortedMessages[0];
      const unreadCount = messages.filter((m: any) => 
        m.receiverId === userId && !m.read
      ).length;

      // Get the other user's ID
      const otherUserId = lastMessage.senderId === userId 
        ? lastMessage.receiverId 
        : lastMessage.senderId;

      // Get request details
      const request = await kv.get(`job:${requestId}`);
      
      // Get other user profile
      let otherUserProfile = await kv.get(`supplier-profile:${otherUserId}`);
      if (!otherUserProfile) {
        otherUserProfile = await kv.get(`customer-profile:${otherUserId}`);
      }

      conversations.push({
        requestId,
        requestTitle: request?.title || "Untitled Request",
        otherUser: {
          id: otherUserId,
          name: otherUserProfile?.name || otherUserProfile?.company || "Unknown User",
          image: otherUserProfile?.profileImage || "",
        },
        lastMessage,
        unreadCount,
      });
    }

    // Sort by last message time
    conversations.sort((a, b) => 
      new Date(b.lastMessage.createdAt).getTime() - new Date(a.lastMessage.createdAt).getTime()
    );

    return c.json({ conversations });
  } catch (error) {
    console.error("Error loading conversations:", error);
    return c.json({ error: String(error) }, 500);
  }
});

// ==========================================
// EMAIL SENDING
// ==========================================

// Send email using Resend API
async function sendEmail(to: string, subject: string, html: string) {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  
  if (!resendApiKey) {
    console.warn("RESEND_API_KEY not configured - email not sent");
    return { success: false, error: "Email service not configured" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Håndverkeren <noreply@handverkeren.no>",
        to: [to],
        subject,
        html,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Email sending failed:", data);
      return { success: false, error: data.message };
    }

    console.log("Email sent successfully:", data.id);
    return { success: true, id: data.id };
  } catch (error) {
    console.error("Email sending error:", error);
    return { success: false, error: String(error) };
  }
}

// Email endpoint (for testing or manual sends)
app.post("/make-server-8d200dba/send-email", async (c) => {
  try {
    const { to, subject, html } = await c.req.json();
    
    if (!to || !subject || !html) {
      return c.json({ error: "Missing required fields: to, subject, html" }, 400);
    }

    const result = await sendEmail(to, subject, html);
    
    if (result.success) {
      return c.json({ success: true, emailId: result.id });
    } else {
      return c.json({ success: false, error: result.error }, 500);
    }
  } catch (error) {
    console.error("Error in send-email endpoint:", error);
    return c.json({ error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);