import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Video, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const UploadPage = () => {
  const [name, setName] = useState("");
  const [exercise, setExercise] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    } else {
      toast.error("Please upload a video file");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !exercise || !videoFile) {
      toast.error("Please fill in all fields");
      return;
    }

    // Simulate upload and redirect to analysis
    toast.success("Video uploaded! Starting analysis...");
    const analysisId = Math.random().toString(36).substring(7);
    setTimeout(() => {
      navigate(`/analysis/${analysisId}`, { 
        state: { name, exercise, videoFile: videoFile.name } 
      });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="max-w-2xl mx-auto">
          <Card className="p-8 shadow-card">
            <h1 className="text-3xl font-bold mb-6 text-gradient">Upload Your Exercise Video</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-lg"
                />
              </div>

              {/* Exercise Selection */}
              <div className="space-y-2">
                <Label htmlFor="exercise">Exercise Type</Label>
                <Select value={exercise} onValueChange={setExercise}>
                  <SelectTrigger id="exercise" className="text-lg">
                    <SelectValue placeholder="Select an exercise" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pushups">Push-ups</SelectItem>
                    <SelectItem value="squats">Squats</SelectItem>
                    <SelectItem value="jumpingjacks">Jumping Jacks</SelectItem>
                    <SelectItem value="burpees">Burpees</SelectItem>
                    <SelectItem value="lunges">Lunges</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Video Upload */}
              <div className="space-y-2">
                <Label>Video Upload</Label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                    isDragging
                      ? "border-primary bg-primary/5"
                      : "border-muted-foreground/25 hover:border-primary/50"
                  }`}
                >
                  {videoPreview ? (
                    <div className="space-y-4">
                      <video
                        src={videoPreview}
                        controls
                        className="max-h-64 mx-auto rounded-lg"
                      />
                      <p className="text-sm text-muted-foreground">{videoFile?.name}</p>
                      <Button type="button" variant="outline" size="sm">
                        Change Video
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <Video className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold mb-1">
                          Drop your video here or click to browse
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Supports MP4, MOV, AVI (Max 100MB)
                        </p>
                      </div>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full text-lg"
                disabled={!name || !exercise || !videoFile}
              >
                <Upload className="mr-2 h-5 w-5" />
                Start Analysis
              </Button>
            </form>
          </Card>

          {/* Tips Card */}
          <Card className="mt-6 p-6 bg-info/5 border-info/20">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              Tips for Best Results
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Record in good lighting with your full body visible</li>
              <li>• Keep the camera steady and at a consistent distance</li>
              <li>• Wear fitted clothing for better pose detection</li>
              <li>• Record from a side or front angle</li>
              <li>• Keep videos under 30 seconds for faster processing</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
