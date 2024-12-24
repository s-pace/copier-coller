import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

type Award = {
  date: string;
  title: string;
  role: string;
  description: string;
  awards?: string[];
};

type ExperienceCategory = {
  type: string;
  items: Award[];
};

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
  const heroScale = useTransform(scrollY, [0, 400], [1, 1.1]);
  const titleY = useTransform(scrollY, [0, 400], [0, 100]);

  const experiences = [
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
        },
        // Add other theater experiences...
      ],
    },
  ];

  const galleryImages = [
    {
      thumb:
        "https://camillebourachot.book.fr/files/1/196513/g_10_EsO0kuuh0Pjv.jpg",
      full: "https://camillebourachot.book.fr/files/1/196513/g_40_EsO0kuuh0Pjv.jpg",
      alt: "Camille Bourachot (1/18)",
    },
    {
      thumb:
        "https://camillebourachot.book.fr/files/1/196513/g_10_kAeR7PM1oX23.jpg",
      full: "https://camillebourachot.book.fr/files/1/196513/g_40_kAeR7PM1oX23.jpg",
      alt: "Camille Bourachot (2/18)",
    },
    {
      thumb:
        "https://camillebourachot.book.fr/files/1/196513/g_10_zgMAhheN8XMo.jpg",
      full: "https://camillebourachot.book.fr/files/1/196513/g_40_zgMAhheN8XMo.jpg",
      alt: "Camille Bourachot (3/18)",
    },
    {
      thumb:
        "https://camillebourachot.book.fr/files/1/196513/g_10_vTpIyTYxGVXq.jpg",
      full: "https://camillebourachot.book.fr/files/1/196513/g_40_vTpIyTYxGVXq.jpg",
      alt: "Camille Bourachot (4/18)",
    },
    {
      thumb:
        "https://camillebourachot.book.fr/files/1/196513/g_10_Z4uCcEELUJtJ.jpg",
      full: "https://camillebourachot.book.fr/files/1/196513/g_40_Z4uCcEELUJtJ.jpg",
      alt: "Camille Bourachot (5/18)",
    },
    {
      thumb:
        "https://camillebourachot.book.fr/files/1/196513/g_10_6m4Vuz3MJqsr.jpg",
      full: "https://camillebourachot.book.fr/files/1/196513/g_40_6m4Vuz3MJqsr.jpg",
      alt: "Camille Bourachot (6/18)",
    },
    {
      thumb:
        "https://camillebourachot.book.fr/files/1/196513/g_10_bMIE26wFr1Mo.jpg",
      full: "https://camillebourachot.book.fr/files/1/196513/g_40_bMIE26wFr1Mo.jpg",
      alt: "Camille Bourachot (7/18)",
    },
    {
      thumb:
        "https://camillebourachot.book.fr/files/1/196513/g_10_3vdvFPd2Qjf8.jpg",
      full: "https://camillebourachot.book.fr/files/1/196513/g_40_3vdvFPd2Qjf8.jpg",
      alt: "Camille Bourachot (8/18)",
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
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 -z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/30 to-purple-50/90" />
          <Image
            src="/camille-hero.webp"
            alt="Camille Bourachot"
            fill
            className="object-cover"
            priority
            quality={100}
          />
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
              ease: "easeOut"
            }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-white/10 backdrop-blur-sm rounded-lg -z-10 
                          group-hover:bg-white/20 transition-colors duration-300" />
            <motion.h1 
              className="text-7xl md:text-8xl font-extralight text-purple-900 mb-4 font-serif tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Camille
              <motion.span 
                className="block mt-2 text-6xl md:text-7xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
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
              className="text-2xl md:text-3xl text-purple-800 font-light tracking-wide"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Comédienne
            </motion.p>
            <motion.div 
              className="flex justify-center gap-6 text-purple-700/80 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {["Théâtre", "Cinéma", "Télévision"].map((text, index) => (
                <React.Fragment key={text}>
                  {index > 0 && <span className="text-purple-400">•</span>}
                  <motion.span
                    whileHover={{ scale: 1.1, color: "#6B46C1" }}
                    transition={{ duration: 0.2 }}
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
            className="text-purple-700 cursor-pointer"
            whileHover={{ scale: 1.2 }}
            animate={{ y: [0, 8, 0] }}
            transition={{ 
              y: { 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
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
              <h2 className="text-3xl font-light text-purple-900 border-b border-purple-200 pb-2">
                {category.type}
              </h2>
              {category.items.map((item) => (
                <div key={item.title} className="space-y-2">
                  <p className="text-sm text-purple-600">{item.date}</p>
                  <h3 className="text-xl font-medium text-purple-900">
                    {item.title}
                  </h3>
                  <p className="text-purple-800">{item.role}</p>
                  <p className="text-purple-700">{item.description}</p>
                  {item.awards && (
                    <ul className="list-disc list-inside text-sm text-purple-600">
                      {item.awards.map((award: string) => (
                        <li key={award}>{award}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((image, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="aspect-[3/4] relative overflow-hidden rounded-lg cursor-pointer"
              onClick={() => setSelectedImage(image.full)}
            >
              <Image
                src={image.thumb}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 25vw"
                loading="lazy"
              />
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
      <footer className="bg-purple-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-light mb-2">Contact</h2>
              <p className="text-purple-200">contact@camillebourachot.com</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-purple-200 transition-colors">
                Instagram
              </a>
              <a href="#" className="hover:text-purple-200 transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CamillePage;
