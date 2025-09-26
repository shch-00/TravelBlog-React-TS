import { useMutation } from "@tanstack/react-query";
const imgbbKey = import.meta.env.VITE_IMGBB_KEY;
async function uploadAvatar(file) {
  const formData = new FormData();
  formData.append("image", file);
  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
    {
      method: "POST",
      body: formData,
    }
  );
  const data = await response.json();
  return data.data.url;
}
const useUploadAvatar = () => {
  return useMutation({
    mutationFn: uploadAvatar,
  });
};
export default useUploadAvatar;
