import { Camera, FileImage, ImageIcon, ScanQrCode } from 'lucide-react';
import React from 'react'

const Features = () => {
  return (
    <section className="mt-10 sm:mt-12" aria-labelledby="supported-qr-title">
      <h2 id="supported-qr-title" className="text-base font-semibold">
        What can you scan?
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        DevPulse AI links and everyday QR codes.
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          {
            title: "DevPulse Programs",
            description: "Read shared program links.",
            icon: ScanQrCode,
          },
          {
            title: "User Profiles",
            description: "Read profile links.",
            icon: Camera
          },
          {
            title: "Web Links",
            description: "Read website QR codes.",
            icon: ImageIcon
          },
          {
            title: "Other QR Data",
            description: "Read encoded text and data.",
            icon: FileImage
          }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-2xl border border-border/60 bg-background/50 p-4">
              <div className="mb-3 flex size-9 items-center justify-center rounded-xl border border-border/60 bg-muted/40">
                <Icon className="size-4"/>
              </div>
              <h3 className="text-sm font-medium">{item.title}</h3>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  )
}

export default Features
