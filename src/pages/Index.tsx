
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, FlaskConical, Upload } from "lucide-react";
import { ImageUpload } from "@/components/ImageUpload";
import { DiagnosisResults } from "@/components/DiagnosisResults";
import { HeroSection } from "@/components/HeroSection";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { t } = useLanguage();

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setShowResults(false);
  };

  const handleAnalyze = () => {
    if (!uploadedImage) return;
    
    setIsAnalyzing(true);
    // Simulate analysis time
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 3000);
  };

  const handleReset = () => {
    setUploadedImage(null);
    setShowResults(false);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {!uploadedImage && <HeroSection />}
      
      <div className="container mx-auto px-4 py-8">
        {!uploadedImage ? (
          <div className="max-w-3xl mx-auto">
            <ImageUpload onImageUpload={handleImageUpload} />
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <Card className="mb-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/2">
                    <h3 className="text-2xl font-semibold mb-6 text-green-800">
                      {t.uploadedImage}
                    </h3>
                    <div className="relative">
                      <img
                        src={uploadedImage}
                        alt="Uploaded plant leaf"
                        className="w-full h-80 object-cover rounded-lg shadow-md"
                      />
                      {isAnalyzing && (
                        <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                          <div className="bg-white/90 rounded-full p-6">
                            <FlaskConical className="w-10 h-10 text-green-600 animate-spin" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="lg:w-1/2 flex flex-col justify-center">
                    <h3 className="text-2xl font-semibold mb-6 text-green-800">
                      {t.analysis}
                    </h3>
                    {!showResults && !isAnalyzing && (
                      <div className="space-y-6">
                        <p className="text-gray-600 text-lg leading-relaxed">
                          {t.readyToAnalyze}
                        </p>
                        <div className="flex gap-4">
                          <Button 
                            onClick={handleAnalyze}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3"
                          >
                            <Search className="w-5 h-5 mr-2" />
                            {t.analyzeLeaf}
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={handleReset}
                            className="border-green-200 text-green-700 hover:bg-green-50 px-6 py-3"
                          >
                            {t.uploadNewImage}
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {isAnalyzing && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <FlaskConical className="w-6 h-6 text-green-600 animate-spin" />
                          <span className="text-green-700 text-lg">{t.analyzingLeaf}</span>
                        </div>
                        <div className="w-full bg-green-100 rounded-full h-3">
                          <div className="bg-green-600 h-3 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          {t.analyzingDescription}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {showResults && (
              <DiagnosisResults onReset={handleReset} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
