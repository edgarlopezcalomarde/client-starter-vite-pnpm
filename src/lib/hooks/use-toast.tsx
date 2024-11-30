import toast from "react-hot-toast";

export function useToast() {
  function onError() {
    toast.error("Error al realizar la operacion. Vuelva a intentarlo");
  }

  function onSuccess() {
    toast.success("Operacion exitosa.");
  }

  function customMessage(text: string, type: "error" | "success") {
    if (type === "error") {
      toast.error(text);
    }

    if (type === "success") {
      toast.success(text);
    }
  }

  return { onError, onSuccess, customMessage };
}
