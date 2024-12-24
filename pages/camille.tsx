import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const ImageModal = ({ src, onClose }: { src: string; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
  >
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.9 }}
      className="relative max-w-7xl max-h-[90vh] w-full"
      onClick={(e) => e.stopPropagation()}
    >
      <Image
        src={src}
        alt="Gallery image"
        width={2667}
        height={4000}
        className="object-contain w-full h-full"
        quality={100}
      />
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-purple-200 text-xl"
      >
        ✕
      </button>
    </motion.div>
  </motion.div>
);

const CamillePage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const titleY = useTransform(scrollY, [0, 400], [0, 100]);

  const experiences: {
    type: string;
    items: {
      date: string;
      title: string;
      role: string;
      description: string;
      awards: string[];
    }[];
  }[] = [
    {
      type: "Court Métrage",
      items: [
        {
          date: "Juin 2024",
          title: "Super 8",
          role: "Rôle principal (Elle) et Scénariste",
          description:
            "Court-métrage réalisé par Joseph Galloni d'Istria et Camille Bourachot",
          awards: [
            "Lauréat du concours 1minute2court : Mention Spéciale du Jury",
            "Sélectionné dans les 10 coups de coeur de Télérama",
          ],
        },
        // Add other experiences...
      ],
    },
    {
      type: "Théâtre",
      items: [
        {
          date: "2024",
          title: "Le Soldat et le Gramophone",
          role: "Tante Typhon et Marija",
          description: "8 représentations à la Ferronnerie, Paris 12ème",
          awards: [],
        },
      ],
    },
  ];

  const galleryImages: {
    thumb: string;
    full: string;
    alt: string;
    srcSet: string;
  }[] = [
    {
      thumb:
        "https://camillebourachot.book.fr/files/1/196513/g_10_EsO0kuuh0Pjv.jpg",
      full: "https://camillebourachot.book.fr/files/1/196513/g_40_EsO0kuuh0Pjv.jpg",
      alt: "Camille Bourachot (1/18)",
      srcSet:
        "https://camillebourachot.book.fr/files/1/196513/g_10_EsO0kuuh0Pjv.jpg 200w,/files/1/196513/g_20_EsO0kuuh0Pjv.jpg 533w,/files/1/196513/g_30_EsO0kuuh0Pjv.jpg 1067w,/files/1/196513/g_40_EsO0kuuh0Pjv.jpg 2667w",
    },
    {
      thumb:
        "https://camillebourachot.book.fr/files/1/196513/g_10_kAeR7PM1oX23.jpg",
      full: "https://camillebourachot.book.fr/files/1/196513/g_40_kAeR7PM1oX23.jpg",
      alt: "Camille Bourachot (2/18)",
      srcSet:
        "https://camillebourachot.book.fr/files/1/196513/g_10_kAeR7PM1oX23.jpg 200w,/files/1/196513/g_20_kAeR7PM1oX23.jpg 533w,/files/1/196513/g_30_kAeR7PM1oX23.jpg 1067w,/files/1/196513/g_40_kAeR7PM1oX23.jpg 2667w",
    },
    {
      thumb:
        "https://camillebourachot.book.fr/files/1/196513/g_10_zgMAhheN8XMo.jpg",
      full: "https://camillebourachot.book.fr/files/1/196513/g_40_zgMAhheN8XMo.jpg",
      alt: "Camille Bourachot (3/18)",
      srcSet:
        "https://camillebourachot.book.fr/files/1/196513/g_10_zgMAhheN8XMo.jpg 200w,/files/1/196513/g_20_zgMAhheN8XMo.jpg 533w,/files/1/196513/g_30_zgMAhheN8XMo.jpg 1067w,/files/1/196513/g_40_zgMAhheN8XMo.jpg 2667w",
    },
    {
      thumb:
        "https://camillebourachot.book.fr/files/1/196513/g_10_vTpIyTYxGVXq.jpg",
      full: "https://camillebourachot.book.fr/files/1/196513/g_40_vTpIyTYxGVXq.jpg",
      alt: "Camille Bourachot (4/18)",
      srcSet:
        "https://camillebourachot.book.fr/files/1/196513/g_10_vTpIyTYxGVXq.jpg 200w,/files/1/196513/g_20_vTpIyTYxGVXq.jpg 533w,/files/1/196513/g_30_vTpIyTYxGVXq.jpg 1067w,/files/1/196513/g_40_vTpIyTYxGVXq.jpg 2667w",
    },
    {
      thumb:
        "https://camillebourachot.book.fr/files/1/196513/g_10_Z4uCcEELUJtJ.jpg",
      full: "https://camillebourachot.book.fr/files/1/196513/g_40_Z4uCcEELUJtJ.jpg",
      alt: "Camille Bourachot (5/18)",
      srcSet:
        "https://camillebourachot.book.fr/files/1/196513/g_10_Z4uCcEELUJtJ.jpg 200w,/files/1/196513/g_20_Z4uCcEELUJtJ.jpg 533w,/files/1/196513/g_30_Z4uCcEELUJtJ.jpg 1067w,/files/1/196513/g_40_Z4uCcEELUJtJ.jpg 2667w",
    },
    {
      thumb:
        "https://camillebourachot.book.fr/files/1/196513/g_10_6m4Vuz3MJqsr.jpg",
      full: "https://camillebourachot.book.fr/files/1/196513/g_40_6m4Vuz3MJqsr.jpg",
      alt: "Camille Bourachot (6/18)",
      srcSet:
        "https://camillebourachot.book.fr/files/1/196513/g_10_6m4Vuz3MJqsr.jpg 200w,/files/1/196513/g_20_6m4Vuz3MJqsr.jpg 533w,/files/1/196513/g_30_6m4Vuz3MJqsr.jpg 1067w,/files/1/196513/g_40_6m4Vuz3MJqsr.jpg 2667w",
    },
    {
      thumb:
        "https://camillebourachot.book.fr/files/1/196513/g_10_bMIE26wFr1Mo.jpg",
      full: "https://camillebourachot.book.fr/files/1/196513/g_40_bMIE26wFr1Mo.jpg",
      alt: "Camille Bourachot (7/18)",
      srcSet:
        "https://camillebourachot.book.fr/files/1/196513/g_10_bMIE26wFr1Mo.jpg 200w,/files/1/196513/g_20_bMIE26wFr1Mo.jpg 533w,/files/1/196513/g_30_bMIE26wFr1Mo.jpg 1067w,/files/1/196513/g_40_bMIE26wFr1Mo.jpg 2667w",
    },
    {
      thumb:
        "https://camillebourachot.book.fr/files/1/196513/g_10_3vdvFPd2Qjf8.jpg",
      full: "https://camillebourachot.book.fr/files/1/196513/g_40_3vdvFPd2Qjf8.jpg",
      alt: "Camille Bourachot (8/18)",
      srcSet:
        "https://camillebourachot.book.fr/files/1/196513/g_10_3vdvFPd2Qjf8.jpg 200w,/files/1/196513/g_20_3vdvFPd2Qjf8.jpg 533w,/files/1/196513/g_30_3vdvFPd2Qjf8.jpg 1067w,/files/1/196513/g_40_3vdvFPd2Qjf8.jpg 2667w",
    },
  ];

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      {/* Hero Section */}
      <header
        className="relative h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/camille-cover.webp")',
        }}
      >
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 -z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/30 to-purple-50/90" />
          full
        </motion.div>

        <motion.div
          style={{ y: titleY }}
          className="relative z-10 text-center space-y-8 px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.3,
              ease: "easeOut",
            }}
            className="relative group"
          >
            <div
              className="absolute -inset-4 rounded-lg -z-10 
                         transition-colors duration-300"
            />
            <motion.h1
              className="text-7xl md:text-8xl font-extralight mb-4 font-serif tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{
                background:
                  "linear-gradient(to bottom right, #D4AF37, #FFF1C1, #8B0000, #FFD700)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0px 4px 4px rgba(139,0,0,0.3)",
              }}
            >
              Camille
              <motion.span
                className="block mt-2 text-6xl md:text-7xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                style={{
                  background:
                    "linear-gradient(to bottom right, #bf953f, #fcf6ba, #b38728, #fbf5b7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "0px 4px 4px rgba(255,160,110,1)",
                }}
              >
                Bourachot
              </motion.span>
            </motion.h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="space-y-6"
          >
            <motion.p
              className="text-2xl md:text-3xl text-white font-light tracking-wide border border-white/30 px-6 py-2 rounded-lg [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5)]"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Comédienne
            </motion.p>
            <motion.div
              className="flex justify-center gap-6 text-white text-lg border border-white/30 px-8 py-3 rounded-lg [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {["Théâtre", "Cinéma", "Télévision"].map((text, index) => (
                <React.Fragment key={text}>
                  {index > 0 && <span className="text-white/70">•</span>}
                  <motion.span
                    whileHover={{ scale: 1.1, color: "#ffffff" }}
                    transition={{ duration: 0.2 }}
                    className="hover:text-white/90"
                  >
                    {text}
                  </motion.span>
                </React.Fragment>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            className="text-white/80 hover:text-white cursor-pointer drop-shadow-lg"
            whileHover={{ scale: 1.2 }}
            animate={{ y: [0, 8, 0] }}
            transition={{
              y: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </header>

      {/* Experience Section */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-16"
        >
          {experiences.map((category) => (
            <div key={category.type} className="space-y-8">
              <h2 className="text-3xl font-light text-[#8B0000] border-b border-[#D4AF37]/30 pb-2">
                {category.type}
              </h2>
              {category.items.map((item) => (
                <div key={item.title} className="space-y-2">
                  <p className="text-sm text-[#B8860B]">{item.date}</p>
                  <h3 className="text-xl font-medium text-[#8B0000]">
                    {item.title}
                  </h3>
                  <p className="text-[#A0522D]">{item.role}</p>
                  <p className="text-[#8B4513]">{item.description}</p>

                  <ul className="list-disc list-inside text-sm text-[#B8860B]">
                    {(item as { awards: string[] }).awards.map(
                      (award: string) => (
                        <li key={award}>{award}</li>
                      ),
                    )}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div
          className="grid grid-cols-6 gap-3"
          style={{
            clear: "both",
            overflow: "hidden",
          }}
        >
          {galleryImages.map((image, i) => (
            <motion.div
              key={i}
              className={`gal_tumb_div ${i === 0 ? "gal_tumb_first_div" : ""} ${
                i >= galleryImages.length - 6 ? "gal_tumb_last_row" : ""
              }`}
              style={{
                width: "123px",
                height: "185px",
                marginRight: i % 6 !== 5 ? "12px" : "0",
              }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedImage(image.full)}
            >
              <div className="relative w-full h-full cursor-pointer">
                <Image
                  src={image.thumb}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 123px"
                  quality={100}
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <ImageModal
            src={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative bg-gradient-to-b from-[#8B0000] to-[#4A0404] text-white py-12">
        {/* Theater Seat Pattern Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-12 h-full">
            {[...Array(48)].map((_, i) => (
              <div key={i} className="relative">
                <div className="absolute inset-0 m-1">
                  <div className="h-full bg-red-800 rounded-t-full border-t-2 border-x-2 border-red-700" />
                  <div className="absolute bottom-0 left-0 right-0 h-4 bg-red-800 border-b-2 border-x-2 border-red-700" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div
          className={`relative max-w-6xl mx-auto px-4 ${playfair.className}`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
            {/* Contact Section */}
            <div className="text-center md:text-left space-y-4">
              <motion.h2
                className="text-4xl font-serif tracking-wide leading-relaxed"
                whileHover={{ scale: 1.05 }}
              >
                Contact
              </motion.h2>
              <motion.div className="space-y-2" whileHover={{ scale: 1.02 }}>
                <p className="text-red-200 hover:text-white transition-colors text-xl">
                  <a
                    href="mailto:contact@camillebourachot.com"
                    className="border-b border-red-400/30 hover:border-red-400"
                  >
                    contact@camillebourachot.com
                  </a>
                </p>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="flex flex-col items-center md:items-end space-y-6">
              <div className="flex space-x-8">
                <motion.a
                  href="#"
                  className="group flex items-center space-x-2 hover:text-red-200 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-xl tracking-wide">Instagram</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </motion.a>
                <motion.a
                  href="#"
                  className="group flex items-center space-x-2 hover:text-red-200 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-xl tracking-wide">LinkedIn</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </motion.a>
              </div>
              <p
                className={`${cormorant.className} text-lg text-red-300/80 italic tracking-wider`}
              >
                "All the world's a stage"
                <span className="block text-sm mt-1 font-light">
                  — William Shakespeare
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#8B0000] via-[#D4AF37] to-[#8B0000]" />
      </footer>
    </div>
  );
};

export default CamillePage;
