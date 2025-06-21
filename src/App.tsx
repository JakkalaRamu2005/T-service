
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Feedback from "./pages/Feedback";
import TWalletServices from "./pages/TWalletServices";
import MeeSeva from "./pages/MeeSeva";
import Dharani from "./pages/Dharani";
import RTAServices from "./pages/RTAServices";
import EducationServices from "./pages/EducationServices";
import HealthServices from "./pages/HealthServices";
import HousingServices from "./pages/HousingServices";
import EmploymentServices from "./pages/EmploymentServices";
import AgricultureSchemes from "./pages/AgricultureSchemes";
import BankingSchemes from "./pages/BankingSchemes";
import BusinessEntrepreneurship from "./pages/BusinessEntrepreneurship";
import News from "./pages/News";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/twallet-services" element={<TWalletServices />} />
            <Route path="/meeseva" element={<MeeSeva />} />
            <Route path="/dharani" element={<Dharani />} />
            <Route path="/rta-services" element={<RTAServices />} />
            <Route path="/education-services" element={<EducationServices />} />
            <Route path="/health-services" element={<HealthServices />} />
            <Route path="/housing-services" element={<HousingServices />} />
            <Route path="/employment-services" element={<EmploymentServices />} />
            <Route path="/agriculture-schemes" element={<AgricultureSchemes />} />
            <Route path="/banking-schemes" element={<BankingSchemes />} />
            <Route path="/business-entrepreneurship" element={<BusinessEntrepreneurship />} />
            <Route path="/news" element={<News />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
