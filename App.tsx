// App.tsx
import React, { useState } from "react";
import jsPDF from "jspdf";

const App = () => {
  const [bio, setBio] = useState("");
  const [streamingLinks, setStreamingLinks] = useState([
    "Spotify",
    "Youtube",
    "Bandcamp",
    "Extra Streaming Link",
  ]);
  const [contactInfo, setContactInfo] = useState([
    "Email",
    "Website",
    "Instagram",
    "Extra Contact Info",
  ]);
  const [tracks, setTracks] = useState(["Track 1"]);
  const [quotes, setQuotes] = useState(["Quote 1"]);
  const [photo, setPhoto] = useState<File | null>(null);

  const exportPDF = () => {
    const doc = new jsPDF();
    let y = 10;

    doc.setFontSize(22);
    doc.text("EPK Builder", 10, y);
    y += 10;

    if (photo) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (typeof e.target?.result === "string") {
          doc.addImage(e.target.result, "JPEG", 10, y, 50, 50);
          y += 60;
          finalizePDF(doc, y);
        }
      };
      reader.readAsDataURL(photo);
    } else {
      finalizePDF(doc, y);
    }
  };

  const finalizePDF = (doc: jsPDF, startY: number) => {
    let y = startY;

    doc.setFontSize(16);
    doc.text("Bio", 10, y);
    y += 10;
    doc.setFontSize(12);
    doc.text(bio, 10, y);
    y += 10 + bio.split("\n").length * 6;

    doc.setFontSize(16);
    doc.text("Streaming Links", 10, y);
    y += 10;
    streamingLinks.forEach((link) => {
      doc.setFontSize(12);
      doc.text(link, 10, y);
      y += 8;
    });

    doc.setFontSize(16);
    doc.text("Contact Info", 10, y);
    y += 10;
    contactInfo.forEach((info) => {
      doc.setFontSize(12);
      doc.text(info, 10, y);
      y += 8;
    });

    doc.setFontSize(16);
    doc.text("Featured Tracks", 10, y);
    y += 10;
    tracks.forEach((track) => {
      doc.setFontSize(12);
      doc.text(track, 10, y);
      y += 8;
    });

    doc.setFontSize(16);
    doc.text("Press Quotes", 10, y);
    y += 10;
    quotes.forEach((quote) => {
      doc.setFontSize(12);
      doc.text(quote, 10, y);
      y += 8;
    });

    doc.save("epk.pdf");
  };

  return (
    <div className="p-6 text-white bg-black min-h-screen font-sans">
      <h1 className="text-4xl font-bold mb-4">EPK Builder</h1>

      <h2 className="text-xl font-bold mb-2">Upload Artist Photo</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setPhoto(e.target.files?.[0] || null)}
        className="mb-6"
      />

      <h2 className="text-xl font-bold mb-2">Bio</h2>
      <textarea
        placeholder="Tell us about the band..."
        className="w-full p-2 border border-gray-300 text-black"
        value={bio}
        maxLength={500}
        onChange={(e) => setBio(e.target.value)}
      />
      <p className="text-sm mb-6">{bio.length} / 500 characters</p>

      <h2 className="text-xl font-bold mb-2">Streaming Links</h2>
      <div className="grid grid-cols-2 gap-2 mb-2">
        {streamingLinks.map((link, index) => (
          <input
            key={index}
            placeholder={link}
            className="p-2 text-black border border-gray-300"
          />
        ))}
      </div>
      <button
        className="text-blue-600 underline mb-6"
        onClick={() => setStreamingLinks([...streamingLinks, ""])}
      >
        + Add Extra Streaming Link
      </button>

      <h2 className="text-xl font-bold mb-2">Contact Info</h2>
      <div className="grid grid-cols-2 gap-2 mb-2">
        {contactInfo.map((info, index) => (
          <input
            key={index}
            placeholder={info}
            className="p-2 text-black border border-gray-300"
          />
        ))}
      </div>
      <button
        className="text-blue-600 underline mb-6"
        onClick={() => setContactInfo([...contactInfo, ""])}
      >
        + Add Extra Contact Info
      </button>

      <h2 className="text-xl font-bold mb-2">Featured Tracks</h2>
      <div className="flex gap-2 mb-2">
        {tracks.map((track, index) => (
          <input
            key={index}
            placeholder={track}
            className="p-2 text-black border border-gray-300"
          />
        ))}
      </div>
      <button
        className="text-blue-600 underline mb-6"
        onClick={() => setTracks([...tracks, ""])}
      >
        + Add More Tracks
      </button>

      <h2 className="text-xl font-bold mb-2">Press Quotes</h2>
      <div className="flex gap-2 mb-2">
        {quotes.map((quote, index) => (
          <input
            key={index}
            placeholder={quote}
            className="p-2 text-black border border-gray-300"
          />
        ))}
      </div>
      <button
        className="text-blue-600 underline mb-6"
        onClick={() => setQuotes([...quotes, ""])}
      >
        + Add More Quotes
      </button>

      <button
        onClick={exportPDF}
        className="bg-white text-black font-semibold py-2 px-4 rounded hover:bg-gray-200"
      >
        Export EPK (PDF)
      </button>
    </div>
  );
};

export default App;
