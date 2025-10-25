import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Activity, Users, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 pt-12">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-card/20 backdrop-blur-sm rounded-full border border-white/20">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-white">AI-Powered Fitness Analysis</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Youth Fitness Challenge
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Upload your exercise video and get instant AI feedback on your form, rep count, and performance! 💪
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/upload">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg text-lg px-8 py-6">
                <Upload className="mr-2 h-5 w-5" />
                Upload Video
              </Button>
            </Link>
            <Link to="/review">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 backdrop-blur-sm">
                <Users className="mr-2 h-5 w-5" />
                Review Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center mb-4">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Smart Rep Counter</h3>
            <p className="text-muted-foreground">
              AI counts your reps with 95%+ accuracy using advanced pose detection
            </p>
          </Card>

          <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-success rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Form Analysis</h3>
            <p className="text-muted-foreground">
              Get scored 0-100 on your technique with personalized improvement tips
            </p>
          </Card>

          <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Human Review</h3>
            <p className="text-muted-foreground">
              Low-confidence results reviewed by experts for maximum accuracy
            </p>
          </Card>
        </div>

        {/* Exercise Types */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Supported Exercises</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Push-ups", "Squats", "Jumping Jacks", "Burpees", "Lunges"].map((exercise) => (
              <div
                key={exercise}
                className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold border border-white/30"
              >
                {exercise}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
