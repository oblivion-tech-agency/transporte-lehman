import { MessageCircle } from "@/components/icons";
import { WA_URL } from "@/lib/site";

export function WhatsAppFab() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener"
      aria-label="Escribinos por WhatsApp"
      className="fixed right-5 bottom-5 z-30 flex size-14 items-center justify-center bg-amber text-on-amber shadow-[0_12px_32px_-8px_rgba(0,0,0,0.6)] transition-[scale,background-color] duration-150 hover:scale-[1.06] hover:bg-[#ffc266] hover:text-on-amber"
    >
      <MessageCircle size={26} />
    </a>
  );
}
