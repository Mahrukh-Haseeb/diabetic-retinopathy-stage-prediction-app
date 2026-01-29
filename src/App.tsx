import { useState, useRef } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ stage: string; confidence: number } | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    setImage(e.target.files[0]);
    setResult(null);

    e.target.value = "";
  };

  const handleAnalyze = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://127.0.0.1:8000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(res.data);
    } catch (error) {
      console.error(error);
      alert("Image analysis failed. Check backend or console.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setResult(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="logo-container">
        <h1 className="logo">RetinAI</h1>
      </div>


      {/* HERO */}
      <section className="hero">
        <div className="hero-grid">
          <div className="flex flex-col items-center text-center px-4">
            <div className="hero-div">
              <img src="/eye-care.png" alt="RetinAI logo" className="h-8 w-8 object-contain" />
              <h1 className="hero-title">
                Diabetic Retinopathy <br /> Stage Prediction
              </h1>
              <p className="hero-text max-w-md">
                Upload a retinal image to detect diabetic retinopathy stages using AI.
              </p>

              <input
                type="file"
                hidden
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
              />

              <div className="mt-4">
                {!image ? (
                  <button onClick={triggerUpload}>Upload Image</button>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="bg-white px-4 py-2 text-sm">
                      {image.name}
                    </div>
                    <div className="flex gap-3 justify-center">
                      {!result && (
                        <button onClick={handleAnalyze} disabled={loading}>
                          {loading ? "Analyzing..." : "Analyze Image"}
                        </button>
                      )}
                      <button
                        onClick={handleReset}
                        className="bg-gray-200 border-gray-200 text-gray-700 hover:bg-gray-300"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {result && (
                <div className="mt-8 p-6 bg-white rounded-xl shadow-lg border-l-4 border-green-500 w-full max-w-sm">
                  <h3 className="text-xl font-bold text-gray-800">Results</h3>
                  <p className="text-lg">
                    Stage: <span className="font-bold text-green-700">{result.stage}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Confidence: {(result.confidence * 100).toFixed(2)}%
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about">
        <div className="about-grid max-w-7xl mx-auto">
          <div className="about-box">
            <h3 className="text-xl font-bold mb-2">AI Powered</h3>
            <p className="opacity-90">Deep learning model trained on retinal images.</p>
          </div>
          <div className="about-box">
            <h3 className="text-xl font-bold mb-2">Fast Screening</h3>
            <p className="opacity-90">Instant stage prediction with professional-grade accuracy scores.</p>
          </div>
          <div className="about-box">
            <h3 className="text-xl font-bold mb-2">Clinical Support</h3>
            <p className="opacity-90">Designed for preliminary screening. Always consult a medical professional.</p>
          </div>
        </div>
      </section>

      {/* DIABETIC RETINOPATHY INFO */}
      <section className="dr-info bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold mb-8 text-center">
            Understanding Diabetic Retinopathy
          </h1>
          <div className="dr-grid-container">
            <div className="info-div main-card">
              <h3 className="font-bold mb-2">Overview</h3>
              <p>
                • Diabetic retinopathy is an eye condition that can happen to people with diabetes.
                <br /><br />
                • It is caused by high blood sugar levels damaging the back of the eye.
                <br /><br />
                • If left undiagnosed and untreated, it can cause blindness.
              </p>
            </div>
            <div className="info-div">
              <p>
                High blood sugar can damage the <br /> tiny blood vessels in the retina.
              </p>
            </div>
            <div className="info-div">
              <p>
                Regular eye check-ups and early detection are key to keeping your eyes healthy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <section>
        <footer>
          <p className="footer">Made with love for Snow Fest Hackathon - 2026</p>
        </footer>
      </section>
    </div>
  );
}

export default App;
