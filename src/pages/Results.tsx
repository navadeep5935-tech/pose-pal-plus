import { useParams, useLocation, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, TrendingUp, Activity, ArrowLeft, Share2, Download } from "lucide-react";
import { toast } from "sonner";

const Results = () => {
  const { id } = useParams();
  const location = useLocation();
  const { name, exercise } = location.state || {};

  // Mock results - in real app, fetch from backend
  const results = {
    reps: 15,
    formScore: 87,
    confidence: 0.92,
    feedback: {
      strengths: [
        "Great job keeping your back straight! 💪",
        "Excellent depth on your squats! 🎯",
        "Consistent tempo throughout the set! ⏱️",
      ],
      improvements: [
        "Try to keep your knees aligned with your toes for better form",
        "Consider slowing down slightly to maintain control",
      ],
      nextSteps: [
        "Challenge yourself with 3 more reps next time!",
        "Try adding a 2-second hold at the bottom of each squat",
      ],
    },
    breakdown: {
      alignment: 92,
      rangeOfMotion: 88,
      stability: 84,
      tempo: 86,
    },
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-success";
    if (score >= 70) return "text-warning";
    return "text-destructive";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { label: "Excellent", variant: "default" as const };
    if (score >= 80) return { label: "Great", variant: "secondary" as const };
    if (score >= 70) return { label: "Good", variant: "secondary" as const };
    return { label: "Needs Work", variant: "outline" as const };
  };

  const badge = getScoreBadge(results.formScore);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        {/* Header */}
        <Card className="p-8 mb-6 bg-gradient-hero text-white shadow-glow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Amazing Work, {name}! 🎉</h1>
              <p className="text-white/90 text-lg">
                You completed {results.reps} {exercise}!
              </p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold">{results.formScore}</div>
              <div className="text-white/80">Form Score</div>
            </div>
          </div>
          <Badge variant={badge.variant} className="text-base px-4 py-1 bg-white/20 border-white/30">
            {badge.label}
          </Badge>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Reps Card */}
          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{results.reps} Reps</h3>
                <p className="text-muted-foreground">Counted with AI</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Confidence</span>
                <span className="font-medium">{(results.confidence * 100).toFixed(0)}%</span>
              </div>
              <Progress value={results.confidence * 100} className="h-2" />
            </div>
          </Card>

          {/* Form Breakdown */}
          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{results.formScore}/100</h3>
                <p className="text-muted-foreground">Form Quality</p>
              </div>
            </div>
            <div className="space-y-2">
              {Object.entries(results.breakdown).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                    <span className={`font-medium ${getScoreColor(value)}`}>{value}%</span>
                  </div>
                  <Progress value={value} className="h-1.5" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Feedback Sections */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <Card className="p-6 bg-success/5 border-success/20 shadow-card">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-success" />
              What You Did Great
            </h3>
            <ul className="space-y-2">
              {results.feedback.strengths.map((item, index) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <span className="text-success">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 bg-warning/5 border-warning/20 shadow-card">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-warning" />
              Areas to Improve
            </h3>
            <ul className="space-y-2">
              {results.feedback.improvements.map((item, index) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <span className="text-warning">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 bg-info/5 border-info/20 shadow-card">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-info" />
              Next Challenge
            </h3>
            <ul className="space-y-2">
              {results.feedback.nextSteps.map((item, index) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <span className="text-info">★</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Link to="/upload" className="flex-1">
            <Button size="lg" className="w-full">
              <Activity className="mr-2 h-5 w-5" />
              Try Another Exercise
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            onClick={() => toast.success("Results copied to clipboard!")}
          >
            <Share2 className="mr-2 h-5 w-5" />
            Share
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => toast.success("Downloading report...")}
          >
            <Download className="mr-2 h-5 w-5" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
