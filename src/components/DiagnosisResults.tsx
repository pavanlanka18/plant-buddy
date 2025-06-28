
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Leaf, FlaskConical, Upload } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface DiagnosisResultsProps {
  onReset: () => void;
}

export const DiagnosisResults = ({ onReset }: DiagnosisResultsProps) => {
  const { t } = useLanguage();
  
  // Mock diagnosis data - in a real app, this would come from AI analysis
  const diagnosis = {
    disease: "Leaf Spot Disease",
    confidence: 89,
    severity: "moderate",
    description: "Common fungal infection affecting plant leaves, characterized by brown spots with yellow halos.",
    treatments: [
      "Remove affected leaves immediately to prevent spread",
      "Apply copper-based fungicide spray every 7-14 days",
      "Improve air circulation around the plant",
      "Water at soil level to avoid wetting leaves",
      "Apply organic neem oil as a preventive measure"
    ],
    prevention: [
      "Avoid overhead watering",
      "Ensure proper plant spacing",
      "Remove plant debris regularly",
      "Monitor humidity levels"
    ]
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'mild': return 'bg-yellow-100 text-yellow-800';
      case 'moderate': return 'bg-orange-100 text-orange-800';
      case 'severe': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'mild': return t.mild;
      case 'moderate': return t.moderate;
      case 'severe': return t.severe;
      default: return severity;
    }
  };

  return (
    <div className="space-y-8">
      {/* Main Diagnosis Card */}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center gap-3">
              <FlaskConical className="w-6 h-6" />
              {t.diagnosisResults}
            </CardTitle>
            <Badge variant="secondary" className="bg-white/20 text-white border-0">
              {diagnosis.confidence}% {t.confidence}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {diagnosis.disease}
              </h3>
              <Badge className={getSeverityColor(diagnosis.severity)}>
                {getSeverityText(diagnosis.severity)} {t.severity}
              </Badge>
              <p className="text-gray-600 mt-4 leading-relaxed text-lg">
                {diagnosis.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Treatment Recommendations */}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-green-800 flex items-center gap-3">
            <Leaf className="w-6 h-6" />
            {t.treatmentRecommendations}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {diagnosis.treatments.map((treatment, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-100">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-lg">{treatment}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Prevention Tips */}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-800 flex items-center gap-3">
            <CheckCircle className="w-6 h-6" />
            {t.preventionTips}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {diagnosis.prevention.map((tip, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700">{tip}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
        <Button
          onClick={onReset}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
        >
          <Upload className="w-5 h-5 mr-2" />
          {t.analyzeAnotherLeaf}
        </Button>
        <Button
          variant="outline"
          className="border-green-200 text-green-700 hover:bg-green-50 px-8 py-3 text-lg"
          onClick={() => window.print()}
        >
          {t.saveDiagnosis}
        </Button>
      </div>
    </div>
  );
};
