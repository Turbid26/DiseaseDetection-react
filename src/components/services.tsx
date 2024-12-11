import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';
import { Button } from './ui/Button.tsx';
import axios from 'axios';

export default function Diagnose() {
  //const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [classificationResult, setClassificationResult] = useState<{
    diagnosis: string;
    accuracy: number;
  } | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('username', localStorage.getItem('username') || 'guest');

      // Step 1: Upload the image to the backend
      const uploadResponse = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { url: imageUrl, username } = uploadResponse.data.upload;
      setMessage('Image uploaded successfully!');

      // Step 2: Classify the image
      const classifyResponse = await axios.post('/api/upload/classify', {
        imageUrl,
        username,
      });

      const { diagnosis, accuracy } = classifyResponse.data;
      setClassificationResult({ diagnosis, accuracy });
      setMessage('Image classified successfully!');
    } catch (error) {
      setMessage('Error processing image. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Upload Plant Image for Diagnosis
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleFileSelect}
                  />
                </label>
                <p className="text-sm text-gray-500">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
            </div>

            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="mx-auto max-h-64 rounded-lg"
                />
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={!selectedFile || isUploading}
            className="w-full"
          >
            {isUploading ? 'Analyzing...' : 'Analyze Image'}
          </Button>
        </form>

        {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}

        {classificationResult && (
          <div className="mt-6 text-center">
            <p className="text-lg font-medium">Diagnosis: {classificationResult.diagnosis}</p>
            <p className="text-sm text-gray-500">
              Accuracy: {classificationResult.accuracy.toFixed(2)}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
