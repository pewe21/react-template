export const useFileUpload = () => {
  const handleFileUpload = async (files: File[]) => {
    if (files.length > 0) {
      const fileURL = URL.createObjectURL(files[0]);
      console.log(fileURL);
    }
  };

  return { handleFileUpload };
};
