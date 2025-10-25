-- Create videos table
CREATE TABLE IF NOT EXISTS public.videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  exercise TEXT NOT NULL,
  video_url TEXT,
  status TEXT NOT NULL DEFAULT 'processing',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create analysis_results table
CREATE TABLE IF NOT EXISTS public.analysis_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL REFERENCES public.videos(id) ON DELETE CASCADE,
  rep_count INTEGER NOT NULL,
  form_score INTEGER NOT NULL,
  confidence DECIMAL NOT NULL,
  feedback_strengths TEXT[],
  feedback_improvements TEXT[],
  feedback_next_steps TEXT[],
  form_breakdown JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create human_reviews table
CREATE TABLE IF NOT EXISTS public.human_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL REFERENCES public.videos(id) ON DELETE CASCADE,
  ai_rep_count INTEGER NOT NULL,
  corrected_rep_count INTEGER,
  reviewer_notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analysis_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.human_reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (no auth required for hackathon)
CREATE POLICY "Allow all on videos" ON public.videos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on analysis_results" ON public.analysis_results FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on human_reviews" ON public.human_reviews FOR ALL USING (true) WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for videos
CREATE TRIGGER update_videos_updated_at
  BEFORE UPDATE ON public.videos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();