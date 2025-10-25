import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity, Brain, CheckCircle2 } from "lucide-react";

const Analysis = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { name, exercise, videoFile } = location.state || {};

  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: "Uploading video", icon: Activity, duration: 15 },
    { label: "Extracting frames", icon: Activity, duration: 20 },
    { label: "Detecting pose", icon: Brain, duration: 35 },
    { label: "Counting reps", icon: Activity, duration: 50 },
    { label: "Analyzing form", icon: Brain, duration: 70 },
    { label: "Generating feedback", icon: CheckCircle2, duration: 90 },
    { label: "Complete", icon: CheckCircle2, duration: 100 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            navigate(`/results/${id}`, {
              state: { name, exercise, videoFile },
            });
          }, 500);
          return 100;
        }
        return next;
      });
    }, 250); // 25 seconds total

    return () => clearInterval(interval);
  }, [id, navigate, name, exercise, videoFile]);

  useEffect(() => {
    const step = steps.findIndex((s) => progress < s.duration);
    setCurrentStep(step === -1 ? steps.length - 1 : step);
  }, [progress]);

  const StepIcon = steps[currentStep].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-info/5 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 shadow-card">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-slow shadow-glow">
            <StepIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Analyzing Your Performance</h1>
          <p className="text-muted-foreground text-lg">
            {name}, we're processing your {exercise} video...
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">{steps[currentStep].label}</span>
              <span className="text-muted-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          <div className="space-y-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isComplete = progress >= step.duration;
              const isCurrent = index === currentStep;

              return (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    isCurrent
                      ? "bg-primary/10 border border-primary/20"
                      : isComplete
                      ? "bg-success/10 border border-success/20"
                      : "bg-muted/30"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isComplete
                        ? "bg-success text-white"
                        : isCurrent
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isComplete ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <span
                    className={`font-medium ${
                      isComplete || isCurrent ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 p-4 bg-info/10 rounded-lg border border-info/20">
          <p className="text-sm text-center text-muted-foreground">
            ⚡ Processing in real-time • Average analysis time: 25-30 seconds
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Analysis;
