import { MessageCircle } from "@/components/icons";
import { Corners } from "@/components/ui";
import { WA_URL } from "@/lib/site";

export function WhatsAppFab() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener"
      aria-label="Escribinos por WhatsApp"
      className="btn btn-primary blueprint fixed right-5 bottom-5 z-30 size-14 animate-pulse-fab border-brand bg-brand p-0 text-bg shadow-md transition-[scale] duration-150 hover:scale-[1.08] hover:bg-brand hover:text-bg"
    >
      <Corners />
      <MessageCircle size={26} />
    </a>
  );
}
