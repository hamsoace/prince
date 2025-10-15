
import React, { useRef, useEffect, useState, useCallback } from 'react';
import Button from './common/Button';

declare var SignaturePad: any;

interface SignatureFieldProps {
  onSignatureChange: (signature: string, initials: string) => void;
  initialSignature?: string;
  initialInitials?: string;
}

const SignatureField: React.FC<SignatureFieldProps> = ({ onSignatureChange, initialSignature, initialInitials }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const signaturePadRef = useRef<any>(null);
  const [initials, setInitials] = useState(initialInitials || '');

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext("2d")?.scale(ratio, ratio);
      if (signaturePadRef.current) {
        signaturePadRef.current.clear(); // Clear signature on resize
        if (initialSignature && signaturePadRef.current.isEmpty()) {
          signaturePadRef.current.fromDataURL(initialSignature);
        }
      }
    }
  }, [initialSignature]);

  useEffect(() => {
    if (canvasRef.current) {
      signaturePadRef.current = new SignaturePad(canvasRef.current, {
        backgroundColor: 'rgb(255, 255, 255)',
      });
      
      if (initialSignature && signaturePadRef.current.isEmpty()) {
        signaturePadRef.current.fromDataURL(initialSignature);
      }
      
      const handleEndStroke = () => {
        if (!signaturePadRef.current.isEmpty()) {
          onSignatureChange(signaturePadRef.current.toDataURL(), initials);
        } else {
          onSignatureChange('', initials);
        }
      };

      signaturePadRef.current.addEventListener("endStroke", handleEndStroke);
      window.addEventListener("resize", resizeCanvas);
      resizeCanvas();

      return () => {
        signaturePadRef.current.removeEventListener("endStroke", handleEndStroke);
        window.removeEventListener("resize", resizeCanvas);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSignature]);
  
  const handleClear = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
      onSignatureChange('', initials);
    }
  };

  const handleInitialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInitials = e.target.value.toUpperCase().slice(0, 3);
    setInitials(newInitials);
    const sigData = signaturePadRef.current && !signaturePadRef.current.isEmpty() ? signaturePadRef.current.toDataURL() : '';
    onSignatureChange(sigData, newInitials);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Draw Signature
        </label>
        <div className="w-full h-48 border border-gray-300 rounded-md bg-white">
          <canvas ref={canvasRef} className="w-full h-full"></canvas>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor="initials" className="block text-sm font-medium text-gray-700 mb-1">
            Initials (Max 3)
          </label>
          <input
            id="initials"
            type="text"
            value={initials}
            onChange={handleInitialsChange}
            maxLength={3}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <Button type="button" variant="secondary" onClick={handleClear} className="w-full">
          Clear Signature
        </Button>
      </div>
    </div>
  );
};

export default SignatureField;
