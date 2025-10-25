import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, CheckCircle2, XCircle, AlertCircle, Video, Edit3 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Review = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Mock pending reviews
  const pendingReviews = [
    {
      id: "1",
      name: "Alex Johnson",
      exercise: "Push-ups",
      timestamp: "2 mins ago",
      aiReps: 12,
      aiFormScore: 76,
      confidence: 0.68,
      reason: "Low confidence - inconsistent pose detection",
    },
    {
      id: "2",
      name: "Sarah Chen",
      exercise: "Squats",
      timestamp: "5 mins ago",
      aiReps: 18,
      aiFormScore: 82,
      confidence: 0.74,
      reason: "Partial occlusion detected",
    },
    {
      id: "3",
      name: "Mike Rodriguez",
      exercise: "Jumping Jacks",
      timestamp: "8 mins ago",
      aiReps: 20,
      aiFormScore: 71,
      confidence: 0.63,
      reason: "Low confidence - lighting issues",
    },
  ];

  const recentCorrections = [
    {
      id: "4",
      name: "Emma Wilson",
      exercise: "Burpees",
      aiReps: 10,
      correctedReps: 12,
      reviewer: "Coach Taylor",
      timestamp: "15 mins ago",
    },
    {
      id: "5",
      name: "James Lee",
      exercise: "Lunges",
      aiReps: 14,
      correctedReps: 14,
      reviewer: "Coach Smith",
      timestamp: "23 mins ago",
    },
  ];

  const handleApprove = (id: string) => {
    toast.success("Analysis approved and sent to user!");
    // In real app, update backend
  };

  const handleCorrect = (id: string) => {
    toast.success("Correction saved! User has been notified.");
    // In real app, save correction
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.85) return "text-success";
    if (confidence >= 0.70) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gradient">Human Review Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Review low-confidence analyses to ensure maximum accuracy
          </p>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="pending">
              Pending Review ({pendingReviews.length})
            </TabsTrigger>
            <TabsTrigger value="history">Correction History</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* List of pending reviews */}
              <div className="space-y-4">
                {pendingReviews.map((review) => (
                  <Card
                    key={review.id}
                    className={`p-6 cursor-pointer transition-all hover:shadow-card ${
                      selectedVideo === review.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedVideo(review.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg">{review.name}</h3>
                        <p className="text-sm text-muted-foreground">{review.exercise}</p>
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Review Needed
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>AI Rep Count:</span>
                        <span className="font-semibold">{review.aiReps}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>AI Form Score:</span>
                        <span className="font-semibold">{review.aiFormScore}/100</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Confidence:</span>
                        <span className={`font-semibold ${getConfidenceColor(review.confidence)}`}>
                          {(review.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 p-3 bg-warning/10 rounded-lg border border-warning/20">
                      <AlertCircle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">{review.reason}</p>
                    </div>

                    <p className="text-xs text-muted-foreground mt-3">{review.timestamp}</p>
                  </Card>
                ))}
              </div>

              {/* Review panel */}
              {selectedVideo ? (
                <Card className="p-6 sticky top-6 h-fit shadow-card">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Video className="w-5 h-5 text-primary" />
                    Video Review
                  </h3>

                  {/* Mock video player */}
                  <div className="aspect-video bg-muted rounded-lg mb-6 flex items-center justify-center">
                    <Video className="w-12 h-12 text-muted-foreground" />
                    <p className="ml-3 text-muted-foreground">Video Player</p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleCorrect(selectedVideo);
                    }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="correctedReps">Corrected Rep Count</Label>
                      <Input
                        id="correctedReps"
                        type="number"
                        placeholder="Enter actual rep count"
                        defaultValue={
                          pendingReviews.find((r) => r.id === selectedVideo)?.aiReps
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        placeholder="Add any observations or corrections..."
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleApprove(selectedVideo)}
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Approve AI Result
                      </Button>
                      <Button type="submit" className="flex-1">
                        <Edit3 className="mr-2 h-4 w-4" />
                        Save Correction
                      </Button>
                    </div>
                  </form>
                </Card>
              ) : (
                <Card className="p-12 flex flex-col items-center justify-center text-center shadow-card">
                  <Video className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Select a Video to Review</h3>
                  <p className="text-muted-foreground">
                    Click on any pending review to start the verification process
                  </p>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="space-y-4">
              {recentCorrections.map((correction) => (
                <Card key={correction.id} className="p-6 shadow-card">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{correction.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {correction.exercise}
                      </p>
                      <div className="flex gap-6 text-sm">
                        <div>
                          <span className="text-muted-foreground">AI Count:</span>
                          <span className="ml-2 font-semibold">{correction.aiReps}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Corrected:</span>
                          <span className="ml-2 font-semibold text-primary">
                            {correction.correctedReps}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="mb-2">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Reviewed
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        by {correction.reviewer}
                      </p>
                      <p className="text-xs text-muted-foreground">{correction.timestamp}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Review;
