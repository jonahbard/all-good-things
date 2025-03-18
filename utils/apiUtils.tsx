export const handleApiResponse = async (response: Response, set: any) => {
  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Error:', `Status: ${response.status}`);
    console.error('API Error:', errorText);
    set({ isLoading: false, error: errorText }); // Update Zustand state
    return null; // Indicate failure
  }
  return response.json(); // Return parsed response data
};
export const handleApiError = (error: unknown, get: any) => {
  const message = (error as Error).message || 'Unknown error occurred';
  get().errorSlice?.newError?.(message);
  console.error('Fetch Error:', message);
};

// primary API url goes here:
// export const API_URL

