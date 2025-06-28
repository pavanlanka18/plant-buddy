
import { Leaf, Search, FlaskConical } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";

export const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-emerald-600/10"></div>
      
      {/* Language Selector */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSelector />
      </div>
      
      <div className="relative container mx-auto px-4 py-16 text-center">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-xl">
              <Leaf className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
              <Search className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          {t.heroTitle}
          <span className="block text-3xl font-normal text-green-600 mt-3">
            {t.heroSubtitle}
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-5xl mx-auto mb-12 leading-relaxed">
          {t.heroDescription}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-4 p-6 bg-white/50 rounded-xl backdrop-blur-sm border border-green-100 hover:bg-white/70 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
              <FlaskConical className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-center">
              <div className="font-semibold text-green-800 text-lg mb-2">{t.aiAnalysisTitle}</div>
              <div className="text-sm text-gray-600">{t.aiAnalysisDesc}</div>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-4 p-6 bg-white/50 rounded-xl backdrop-blur-sm border border-green-100 hover:bg-white/70 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-center">
              <div className="font-semibold text-green-800 text-lg mb-2">{t.diseaseDetectionTitle}</div>
              <div className="text-sm text-gray-600">{t.diseaseDetectionDesc}</div>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-4 p-6 bg-white/50 rounded-xl backdrop-blur-sm border border-green-100 hover:bg-white/70 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-center">
              <div className="font-semibold text-green-800 text-lg mb-2">{t.treatmentGuideTitle}</div>
              <div className="text-sm text-gray-600">{t.treatmentGuideDesc}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
