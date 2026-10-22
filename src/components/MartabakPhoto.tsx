"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function MartabakPhoto({
  candidates,
  alt,
}: {
  candidates: (string | undefined)[];
  alt: string;
}) {
  const [failed, setFailed] = useState<string[]>([]);
  const src = candidates.find((c): c is string => !!c && !failed.includes(c));
  if (!src) return <>🥞</>;
  return (
    <motion.div
      key={src}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0"
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover"
        onError={() => setFailed((f) => [...f, src])}
      />
    </motion.div>
  );
}
