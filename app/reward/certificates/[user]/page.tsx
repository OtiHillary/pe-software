'use client'
import { useRef } from 'react';

export default function Home({ params }: { params: { user: string } }){
    const {user} = params
    const certificateRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (!certificateRef.current) return;

        try {
            // Using html2canvas library (you'll need to install it)
            const html2canvas = (await import('html2canvas')).default;
            
            const canvas = await html2canvas(certificateRef.current, {
                scale: 2, // Higher quality
                useCORS: true, // Allow cross-origin images
                backgroundColor: '#ffffff'
            });

            // Convert to blob and download
            canvas.toBlob((blob) => {
                if (blob) {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `certificate-${params.user}.pdf`;
                    link.click();
                    URL.revokeObjectURL(url);
                }
            });
        } catch (error) {
            console.error('Download failed:', error);
        }
    };
    
    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-gray-100 p-4">
            {/* Fixed aspect ratio container - adjust based on your certificate dimensions */}
            <div ref={certificateRef} className="relative w-full max-w-[1200px] aspect-[1.414/1]">
                <img 
                    src="/1st-class-cert.png" 
                    alt="Certificate"
                    className="absolute inset-0 w-full h-full object-fill"
                />
                
                {/* All text positioned with percentage of container */}
                <div className="absolute inset-0">
                    {/* Name */}
                    <p 
                        className="absolute text-center whitespace-nowrap font-serif"
                        style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            fontSize: 'clamp(1.5rem, 4vw, 3rem)'
                        }}
                    >
                        {user.replaceAll("%20", " ")}
                    </p>
                    
                    {/* Signature */}
                    <p 
                        className="absolute text-center"
                        style={{
                            bottom: '18%',
                            left: '20%',
                            fontSize: 'clamp(1rem, 2.5vw, 2rem)'
                        }}
                    >
                        signature
                    </p>
                    
                    {/* Date */}
                    <p 
                        className="absolute text-center"
                        style={{
                            bottom: '18%',
                            right: '22%',
                            fontSize: 'clamp(1rem, 2.5vw, 2rem)'
                        }}
                    >
                        date
                    </p>
                </div>
            </div>

            <button
                onClick={handleDownload}
                className="absolute right-20 bottom-20 bg-pes hover:bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-colors duration-200"
            >
                Download Certificate
            </button>
        </div>
    )
}