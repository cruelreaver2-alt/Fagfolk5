import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Header } from "../components/Header";
import {
  Search,
  Plus,
  Trash2,
  Calculator,
  FileText,
  Package,
  Shield,
  CheckCircle,
  X,
  Info,
} from "lucide-react";
import { MATERIAL_DATABASE, Material, SelectedMaterial } from "../data/materials";
import { useAuth } from "../context/AuthContext";

interface CalculatorItem {
  name: string;
  quantity: number;
  unit: string;
}

interface LaborItem {
  id: string;
  description: string;
  hours: number;
  hourlyRate: number;
}

export function TestOfferBuilder() {
  const navigate = useNavigate();
  const { userId } = useAuth();

  const [activeTab, setActiveTab] = useState<"materials" | "calculator">("materials");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedMaterials, setSelectedMaterials] = useState<SelectedMaterial[]>([]);
  const [showCalculator, setShowCalculator] = useState(false);

  // Custom material modal
  const [showCustomMaterialModal, setShowCustomMaterialModal] = useState(false);
  const [customMaterialName, setCustomMaterialName] = useState("");
  const [customMaterialCategory, setCustomMaterialCategory] = useState("");
  const [customMaterialUnit, setCustomMaterialUnit] = useState("stk");
  const [customMaterialPrice, setCustomMaterialPrice] = useState("");

  // Price edit modal
  const [showPriceEditModal, setShowPriceEditModal] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [editedPrice, setEditedPrice] = useState("");
  const [editedQuantity, setEditedQuantity] = useState("");

  // Calculator state
  const [calculatorType, setCalculatorType] = useState<"roof" | "painting" | "flooring" | "deck" | "cladding">("roof");
  const [calcArea, setCalcArea] = useState("");
  const [calcLength, setCalcLength] = useState("");
  const [calcWidth, setCalcWidth] = useState("");
  const [calcResults, setCalcResults] = useState<CalculatorItem[]>([]);

  // Offer details
  const [laborItems, setLaborItems] = useState<LaborItem[]>([
    { id: "1", description: "Arbeid", hours: 0, hourlyRate: 800 }
  ]);
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [warranty, setWarranty] = useState("12");
  const [startDate, setStartDate] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("escrow");

  useEffect(() => {
    if (!userId) {
      navigate("/leverandør-logg-inn");
    }
  }, [userId, navigate]);

  // Get all materials from database (it's an object with categories as keys, not an array)
  const getAllMaterials = (): Material[] => {
    return Object.values(MATERIAL_DATABASE).flat();
  };

  const allMaterials = getAllMaterials();
  const categories = ["all", ...new Set(allMaterials.map((m) => m.category))];

  const filteredMaterials = allMaterials.filter((material) => {
    const matchesSearch =
      material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || material.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddMaterial = (material: Material) => {
    const existing = selectedMaterials.find((m) => m.id === material.id);
    if (existing) {
      setSelectedMaterials(
        selectedMaterials.map((m) =>
          m.id === material.id ? { ...m, quantity: m.quantity + 1, totalPrice: m.pricePerUnit * (m.quantity + 1) } : m
        )
      );
    } else {
      setSelectedMaterials([...selectedMaterials, { ...material, quantity: 1, totalPrice: material.pricePerUnit }]);
    }
  };

  const handleRemoveMaterial = (materialId: string) => {
    setSelectedMaterials(selectedMaterials.filter((m) => m.id !== materialId));
  };

  const handleUpdateQuantity = (materialId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveMaterial(materialId);
    } else {
      setSelectedMaterials(
        selectedMaterials.map((m) => 
          m.id === materialId ? { ...m, quantity, totalPrice: m.pricePerUnit * quantity } : m
        )
      );
    }
  };

  const handleAddCustomMaterial = () => {
    const price = parseFloat(customMaterialPrice) || 0;
    const newMaterial: SelectedMaterial = {
      id: `custom-${Date.now()}`,
      name: customMaterialName,
      category: customMaterialCategory || "Egendefinert",
      pricePerUnit: price,
      unit: customMaterialUnit,
      coverage: 0,
      quantity: 1,
      totalPrice: price,
    };

    setSelectedMaterials([...selectedMaterials, newMaterial]);
    setShowCustomMaterialModal(false);
    setCustomMaterialName("");
    setCustomMaterialCategory("");
    setCustomMaterialUnit("stk");
    setCustomMaterialPrice("");
  };

  const handleEditPrice = (material: Material) => {
    setEditingMaterial(material);
    const selected = selectedMaterials.find((m) => m.id === material.id);
    setEditedPrice(selected ? selected.pricePerUnit.toString() : material.pricePerUnit.toString());
    setEditedQuantity(selected ? selected.quantity.toString() : "1");
    setShowPriceEditModal(true);
  };

  const handleSaveEditedPrice = () => {
    if (!editingMaterial) return;

    const newPrice = parseFloat(editedPrice) || editingMaterial.pricePerUnit;
    const newQuantity = parseInt(editedQuantity) || 1;

    const existing = selectedMaterials.find((m) => m.id === editingMaterial.id);
    if (existing) {
      setSelectedMaterials(
        selectedMaterials.map((m) =>
          m.id === editingMaterial.id
            ? { ...m, pricePerUnit: newPrice, quantity: newQuantity, totalPrice: newPrice * newQuantity }
            : m
        )
      );
    } else {
      setSelectedMaterials([
        ...selectedMaterials,
        { ...editingMaterial, pricePerUnit: newPrice, quantity: newQuantity, totalPrice: newPrice * newQuantity },
      ]);
    }

    setShowPriceEditModal(false);
    setEditingMaterial(null);
    setEditedPrice("");
    setEditedQuantity("");
  };

  const runCalculator = () => {
    const results: CalculatorItem[] = [];
    const area = parseFloat(calcArea) || 0;
    const length = parseFloat(calcLength) || 0;
    const width = parseFloat(calcWidth) || 0;

    if (calculatorType === "roof") {
      const calculatedArea = area || length * width;
      const tiles = Math.ceil((calculatedArea * 10) / 0.33);
      const underlayment = Math.ceil(calculatedArea * 1.1);
      const nails = Math.ceil(tiles * 5);

      results.push(
        { name: "Takstein", quantity: tiles, unit: "stk" },
        { name: "Underlagspapp", quantity: underlayment, unit: "m²" },
        { name: "Takspiker", quantity: nails, unit: "stk" }
      );
    } else if (calculatorType === "painting") {
      const calculatedArea = area || (length * width + length * 2.5 * 2 + width * 2.5 * 2);
      const primer = Math.ceil(calculatedArea / 10);
      const paint = Math.ceil((calculatedArea / 8) * 2);
      const tape = Math.ceil((length + width) * 2 * 1.2);

      results.push(
        { name: "Grunning", quantity: primer, unit: "liter" },
        { name: "Maling", quantity: paint, unit: "liter" },
        { name: "Malertape", quantity: tape, unit: "meter" }
      );
    } else if (calculatorType === "flooring") {
      const calculatedArea = area || length * width;
      const flooring = Math.ceil(calculatedArea * 1.1);
      const underlayment = Math.ceil(calculatedArea * 1.05);
      const baseboard = Math.ceil((length + width) * 2 * 1.05);

      results.push(
        { name: "Gulvplanker", quantity: flooring, unit: "m²" },
        { name: "Underlagsmatte", quantity: underlayment, unit: "m²" },
        { name: "Gulvlist", quantity: baseboard, unit: "meter" }
      );
    } else if (calculatorType === "deck") {
      const calculatedArea = area || length * width;
      const decking = Math.ceil(calculatedArea * 1.15);
      const joists = Math.ceil((length / 0.6) * width);
      const screws = Math.ceil(decking * 30);

      results.push(
        { name: "Terrassebord", quantity: decking, unit: "m²" },
        { name: "Bjelker", quantity: joists, unit: "stk" },
        { name: "Terrasse-skruer", quantity: screws, unit: "stk" }
      );
    } else if (calculatorType === "cladding") {
      const calculatedArea = area || length * width;
      const panels = Math.ceil(calculatedArea * 1.1);
      const battens = Math.ceil((calculatedArea / 0.6) * 1.1);
      const nails = Math.ceil(panels * 25);

      results.push(
        { name: "Kledning", quantity: panels, unit: "m²" },
        { name: "Lekter", quantity: battens, unit: "meter" },
        { name: "Spiker", quantity: nails, unit: "stk" }
      );
    }

    setCalcResults(results);
  };

  const addCalculatorResultsToMaterials = () => {
    const newMaterials: SelectedMaterial[] = calcResults.map((result, index) => ({
      id: `calc-${Date.now()}-${index}`,
      name: result.name,
      category: "Kalkulator",
      pricePerUnit: 0,
      unit: result.unit,
      coverage: 0,
      quantity: result.quantity,
      totalPrice: 0,
    }));

    setSelectedMaterials([...selectedMaterials, ...newMaterials]);
    setShowCalculator(false);
    setCalcResults([]);
  };

  // Labor item handlers
  const handleAddLaborItem = () => {
    const newItem: LaborItem = {
      id: Date.now().toString(),
      description: "",
      hours: 0,
      hourlyRate: 800,
    };
    setLaborItems([...laborItems, newItem]);
  };

  const handleRemoveLaborItem = (id: string) => {
    if (laborItems.length > 1) {
      setLaborItems(laborItems.filter(item => item.id !== id));
    }
  };

  const handleUpdateLaborItem = (id: string, field: keyof LaborItem, value: string | number) => {
    setLaborItems(laborItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const totalMaterialCost = selectedMaterials.reduce(
    (sum, m) => sum + m.totalPrice,
    0
  );

  const totalLaborCost = laborItems.reduce(
    (sum, item) => sum + item.hours * item.hourlyRate,
    0
  );
  const totalPrice = totalMaterialCost + totalLaborCost;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header
        variant="simple"
        title="Test Tilbudsbygger"
        onBack={() => navigate("/leverandør-dashboard")}
      />

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Info Banner */}
        <div className="mb-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 text-sm mb-1">
                🧪 Testsiden for tilbudsbygger
              </h3>
              <p className="text-xs text-blue-800">
                Her kan du teste tilbudsbyggeren uten å være knyttet til en faktisk kunde-forespørsel.
                Dette er perfekt for å lære systemet og teste ulike scenarier.
              </p>
            </div>
          </div>
        </div>

        {/* Demo Job Info */}
        <div className="mb-6 bg-white rounded-xl shadow-md p-6 border-2 border-[#E5E7EB]">
          <h2 className="text-xl font-bold text-[#111827] mb-4">Demo kundeforespørsel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-[#6B7280] mb-1">
                <strong>Kunde:</strong> Test Kunde
              </p>
              <p className="text-sm text-[#6B7280] mb-1">
                <strong>Prosjekt:</strong> Bygge terrasse
              </p>
              <p className="text-sm text-[#6B7280]">
                <strong>Lokasjon:</strong> Oslo, Norge
              </p>
            </div>
            <div>
              <p className="text-sm text-[#6B7280] mb-1">
                <strong>Beskrivelse:</strong> Ønsker 20 m² terrasse i massiv furu
              </p>
              <p className="text-sm text-[#6B7280]">
                <strong>Budsjett:</strong> 30 000 - 50 000 kr
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setActiveTab("materials")}
            className={`flex-1 h-12 rounded-lg font-semibold transition-colors ${
              activeTab === "materials"
                ? "bg-[#17384E] text-white"
                : "bg-white text-[#6B7280] border-2 border-[#E5E7EB] hover:bg-gray-50"
            }`}
          >
            <Package className="w-5 h-5 inline-block mr-2" />
            Materialer
          </button>
          <button
            onClick={() => setActiveTab("calculator")}
            className={`flex-1 h-12 rounded-lg font-semibold transition-colors ${
              activeTab === "calculator"
                ? "bg-[#17384E] text-white"
                : "bg-white text-[#6B7280] border-2 border-[#E5E7EB] hover:bg-gray-50"
            }`}
          >
            <Calculator className="w-5 h-5 inline-block mr-2" />
            Kalkulator
          </button>
        </div>

        {/* Materials Tab */}
        {activeTab === "materials" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Material Database */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#111827]">
                  Materialdatabase (10 000+ produkter)
                </h3>
                <button
                  onClick={() => setShowCustomMaterialModal(true)}
                  className="h-10 px-4 bg-[#E07B3E] text-white rounded-lg text-sm font-semibold hover:bg-[#d16f35] transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Egendefinert
                </button>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Søk etter produkt eller kategori..."
                  className="w-full h-12 pl-11 pr-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17384E] focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="mb-4 flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`h-8 px-3 rounded-full text-xs font-semibold transition-colors ${
                      selectedCategory === cat
                        ? "bg-[#17384E] text-white"
                        : "bg-gray-100 text-[#6B7280] hover:bg-gray-200"
                    }`}
                  >
                    {cat === "all" ? "Alle" : cat}
                  </button>
                ))}
              </div>

              {/* Material List */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredMaterials.slice(0, 20).map((material) => (
                  <div
                    key={material.id}
                    className="border border-[#E5E7EB] rounded-lg p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-[#111827]">
                        {material.name}
                      </h4>
                      <p className="text-xs text-[#6B7280]">
                        {material.category}
                      </p>
                      <p className="text-sm font-semibold text-[#17384E] mt-1">
                        {material.pricePerUnit.toLocaleString("nb-NO")} kr/{material.unit}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditPrice(material)}
                        className="h-8 px-3 bg-gray-100 text-[#6B7280] rounded text-xs font-semibold hover:bg-gray-200 transition-colors"
                      >
                        Rediger
                      </button>
                      <button
                        onClick={() => handleAddMaterial(material)}
                        className="h-8 px-3 bg-[#17384E] text-white rounded text-xs font-semibold hover:bg-[#1a4459] transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Materials */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-[#111827] mb-4">
                Valgte materialer ({selectedMaterials.length})
              </h3>

              <div className="space-y-3 mb-4">
                {selectedMaterials.map((material) => (
                  <div
                    key={material.id}
                    className="border border-[#E5E7EB] rounded-lg p-3"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-xs text-[#111827]">
                          {material.name}
                        </h4>
                        <p className="text-xs text-[#6B7280]">
                          {material.pricePerUnit.toLocaleString("nb-NO")} kr/{material.unit}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveMaterial(material.id)}
                        className="text-red-600 hover:bg-red-50 p-1 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        value={material.quantity}
                        onChange={(e) =>
                          handleUpdateQuantity(material.id, parseInt(e.target.value))
                        }
                        className="w-20 h-8 px-2 border border-[#E5E7EB] rounded text-sm text-center"
                      />
                      <span className="text-xs text-[#6B7280]">{material.unit}</span>
                      <span className="ml-auto text-sm font-semibold text-[#17384E]">
                        {material.totalPrice.toLocaleString("nb-NO")} kr
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#E5E7EB] pt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#6B7280]">Materialkostnad:</span>
                  <span className="font-semibold text-[#111827]">
                    {totalMaterialCost.toLocaleString("nb-NO")} kr
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-[#E5E7EB] pt-3 mt-3">
                  <span className="text-[#111827]">Totalpris:</span>
                  <span className="text-[#17384E]">
                    {totalPrice.toLocaleString("nb-NO")} kr
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Calculator Tab */}
        {activeTab === "calculator" && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-bold text-[#111827] mb-4">
              Materialkalkulator
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#111827] mb-2">
                  Velg kalkulatortype
                </label>
                <select
                  value={calculatorType}
                  onChange={(e) =>
                    setCalculatorType(
                      e.target.value as
                        | "roof"
                        | "painting"
                        | "flooring"
                        | "deck"
                        | "cladding"
                    )
                  }
                  className="w-full h-12 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17384E]"
                >
                  <option value="roof">Tak</option>
                  <option value="painting">Maling</option>
                  <option value="flooring">Gulv</option>
                  <option value="deck">Terrasse</option>
                  <option value="cladding">Kledning</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#111827] mb-2">
                  Areal (m²)
                </label>
                <input
                  type="number"
                  value={calcArea}
                  onChange={(e) => setCalcArea(e.target.value)}
                  placeholder="Skriv inn areal direkte"
                  className="w-full h-12 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17384E]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#111827] mb-2">
                  Lengde (m)
                </label>
                <input
                  type="number"
                  value={calcLength}
                  onChange={(e) => setCalcLength(e.target.value)}
                  placeholder="Lengde"
                  className="w-full h-12 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17384E]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#111827] mb-2">
                  Bredde (m)
                </label>
                <input
                  type="number"
                  value={calcWidth}
                  onChange={(e) => setCalcWidth(e.target.value)}
                  placeholder="Bredde"
                  className="w-full h-12 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17384E]"
                />
              </div>
            </div>

            <button
              onClick={runCalculator}
              className="w-full h-12 bg-[#17384E] text-white rounded-lg font-semibold hover:bg-[#1a4459] transition-colors mt-6 flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              Kjør kalkulator
            </button>

            {calcResults.length > 0 && (
              <div className="mt-6 border-t border-[#E5E7EB] pt-6">
                <h4 className="text-sm font-bold text-[#111827] mb-4">
                  Kalkulerte materialer:
                </h4>
                <div className="space-y-2 mb-4">
                  {calcResults.map((result, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm text-[#111827]">{result.name}</span>
                      <span className="text-sm font-semibold text-[#17384E]">
                        {result.quantity} {result.unit}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={addCalculatorResultsToMaterials}
                  className="w-full h-12 bg-[#E07B3E] text-white rounded-lg font-semibold hover:bg-[#d16f35] transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Legg til i tilbud
                </button>
              </div>
            )}
          </div>
        )}

        {/* Labor/Work Details Section */}
        <div className="mt-6 bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[#111827]">
              Arbeidskostnad
            </h3>
            <button
              onClick={handleAddLaborItem}
              className="h-10 px-4 bg-[#E07B3E] text-white rounded-lg text-sm font-semibold hover:bg-[#d16f35] transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Legg til linje
            </button>
          </div>

          <div className="space-y-4">
            {laborItems.map((item) => (
              <div
                key={item.id}
                className="border border-[#E5E7EB] rounded-lg p-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-5">
                    <label className="block text-sm font-semibold text-[#111827] mb-2">
                      Beskrivelse av arbeidsoppgave
                    </label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) =>
                        handleUpdateLaborItem(item.id, "description", e.target.value)
                      }
                      placeholder="f.eks. Montering av terrassebord"
                      className="w-full h-12 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17384E]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-[#111827] mb-2">
                      Timer
                    </label>
                    <input
                      type="number"
                      value={item.hours || ""}
                      onChange={(e) =>
                        handleUpdateLaborItem(
                          item.id,
                          "hours",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      placeholder="0"
                      min="0"
                      step="0.5"
                      className="w-full h-12 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17384E]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-[#111827] mb-2">
                      Timepris (kr)
                    </label>
                    <input
                      type="number"
                      value={item.hourlyRate || ""}
                      onChange={(e) =>
                        handleUpdateLaborItem(
                          item.id,
                          "hourlyRate",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      placeholder="800"
                      min="0"
                      className="w-full h-12 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17384E]"
                    />
                  </div>

                  <div className="md:col-span-2 flex items-end gap-2">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-[#111827] mb-2">
                        Sum
                      </label>
                      <div className="h-12 px-4 border border-[#E5E7EB] rounded-lg bg-gray-50 flex items-center justify-end font-semibold text-[#17384E]">
                        {(item.hours * item.hourlyRate).toLocaleString("nb-NO")} kr
                      </div>
                    </div>
                    {laborItems.length > 1 && (
                      <button
                        onClick={() => handleRemoveLaborItem(item.id)}
                        className="h-12 w-12 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-[#E5E7EB]">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-[#111827]">
                Total arbeidskostnad:
              </span>
              <span className="text-2xl font-bold text-[#17384E]">
                {totalLaborCost.toLocaleString("nb-NO")} kr
              </span>
            </div>
          </div>
        </div>

        {/* Offer Details */}
        <div className="mt-6 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-[#111827] mb-4">
            Tilbudsdetaljer
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#111827] mb-2">
                Varighet
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="f.eks. 3-5 dager"
                className="w-full h-12 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17384E]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#111827] mb-2">
                Startdato
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full h-12 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17384E]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#111827] mb-2">
                Garanti (måneder)
              </label>
              <input
                type="number"
                value={warranty}
                onChange={(e) => setWarranty(e.target.value)}
                className="w-full h-12 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17384E]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#111827] mb-2">
                Betalingsbetingelser
              </label>
              <select
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                className="w-full h-12 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17384E]"
              >
                <option value="escrow">
                  Sikker betaling via Håndtverkeren (Escrow)
                </option>
                <option value="advance">50% forskudd, 50% ved levering</option>
                <option value="completion">100% ved fullføring</option>
                <option value="invoice">Faktura 14 dager netto</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-[#111827] mb-2">
              Beskrivelse av arbeidet
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Beskriv arbeidet som skal utføres..."
              rows={4}
              className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17384E] resize-none"
            />
          </div>
        </div>

        {/* Escrow Info */}
        <div className="mt-6 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-green-900 mb-2">
                💰 Sikker betaling via Håndtverkeren
              </h3>
              <p className="text-sm text-green-800 mb-3">
                Vi anbefaler å bruke vår sikre escrow-løsning for trygg betaling:
              </p>
              <ul className="text-sm text-green-800 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Kunden betaler til sperret konto:</strong> Pengene holdes sikret
                    til jobben er godkjent
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Du starter arbeidet trygt:</strong> Vet at pengene er på plass
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Automatisk utbetaling:</strong> Når kunden godkjenner jobben,
                    utbetales pengene til deg
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Beskyttelse for begge parter:</strong> Tvisteløsning ved
                    uenigheter
                  </span>
                </li>
              </ul>
              <p className="text-xs text-green-700 mt-3 italic">
                * 2% service-gebyr på betalingen (splittes 1% kunde, 1% leverandør)
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => {
              alert(
                "Dette er en testside. I produksjon ville tilbudet blitt sendt til kunden."
              );
            }}
            className="flex-1 h-14 bg-gradient-to-r from-[#17384E] to-[#E07B3E] text-white rounded-xl font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <FileText className="w-6 h-6" />
            Send testilbud
          </button>
          <button
            onClick={() => navigate("/leverandør-dashboard")}
            className="h-14 px-6 border-2 border-[#E5E7EB] text-[#6B7280] rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            Avbryt
          </button>
        </div>
      </div>

      {/* Custom Material Modal */}
      {showCustomMaterialModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#111827]">
                Legg til egendefinert materiale
              </h3>
              <button
                onClick={() => setShowCustomMaterialModal(false)}
                className="text-[#6B7280] hover:bg-gray-100 p-1 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#111827] mb-2">
                  Materiale-navn
                </label>
                <input
                  type="text"
                  value={customMaterialName}
                  onChange={(e) => setCustomMaterialName(e.target.value)}
                  placeholder="f.eks. Spesial skruer"
                  className="w-full h-12 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17384E]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#111827] mb-2">
                  Kategori (valgfritt)
                </label>
                <input
                  type="text"
                  value={customMaterialCategory}
                  onChange={(e) => setCustomMaterialCategory(e.target.value)}
                  placeholder="f.eks. Beslag"
                  className="w-full h-12 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17384E]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#111827] mb-2">
                  Enhet
                </label>
                <select
                  value={customMaterialUnit}
                  onChange={(e) => setCustomMaterialUnit(e.target.value)}
                  className="w-full h-12 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17384E]"
                >
                  <option value="stk">stk</option>
                  <option value="m">m</option>
                  <option value="m²">m²</option>
                  <option value="liter">liter</option>
                  <option value="kg">kg</option>
                  <option value="pakke">pakke</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#111827] mb-2">
                  Pris per enhet (kr)
                </label>
                <input
                  type="number"
                  value={customMaterialPrice}
                  onChange={(e) => setCustomMaterialPrice(e.target.value)}
                  placeholder="0"
                  className="w-full h-12 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17384E]"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddCustomMaterial}
                disabled={!customMaterialName}
                className="flex-1 h-12 bg-[#17384E] text-white rounded-lg font-semibold hover:bg-[#1a4459] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Legg til
              </button>
              <button
                onClick={() => setShowCustomMaterialModal(false)}
                className="h-12 px-6 border-2 border-[#E5E7EB] text-[#6B7280] rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Avbryt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Price Edit Modal */}
      {showPriceEditModal && editingMaterial && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#111827]">Rediger pris</h3>
              <button
                onClick={() => setShowPriceEditModal(false)}
                className="text-[#6B7280] hover:bg-gray-100 p-1 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-[#6B7280] mb-1">
                <strong>{editingMaterial.name}</strong>
              </p>
              <p className="text-xs text-[#9CA3AF]">
                {editingMaterial.category}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#111827] mb-2">
                  Pris per {editingMaterial.unit} (kr)
                </label>
                <input
                  type="number"
                  value={editedPrice}
                  onChange={(e) => setEditedPrice(e.target.value)}
                  placeholder={editingMaterial.pricePerUnit.toString()}
                  className="w-full h-12 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17384E]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#111827] mb-2">
                  Antall ({editingMaterial.unit})
                </label>
                <input
                  type="number"
                  value={editedQuantity}
                  onChange={(e) => setEditedQuantity(e.target.value)}
                  placeholder="1"
                  min="1"
                  className="w-full h-12 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17384E]"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveEditedPrice}
                className="flex-1 h-12 bg-[#17384E] text-white rounded-lg font-semibold hover:bg-[#1a4459] transition-colors"
              >
                Lagre
              </button>
              <button
                onClick={() => setShowPriceEditModal(false)}
                className="h-12 px-6 border-2 border-[#E5E7EB] text-[#6B7280] rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Avbryt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}