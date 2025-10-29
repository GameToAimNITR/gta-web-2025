'use server';

export interface FormState {
  message: string;
  status: 'success' | 'error' | 'idle';
}

// This is a server action.
// It will be executed on the server, not in the browser.
export async function submitForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 1000));

  const formId = formData.get('formId');
  console.log(`Received submission for form: ${formId}`);

  // You can iterate through formData to get all the submitted values
  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  // ====================================================================
  // TODO: Add your Google Sheets integration logic here.
  // - Use a library like 'google-spreadsheet' or the Google Sheets API.
  // - Authenticate with your Google Cloud credentials (use environment variables).
  // - Find the correct sheet based on the formId.
  // - Append a new row with the formData.
  //
  // Example using a placeholder function:
  //
  // try {
  //   const result = await saveToGoogleSheet(formData);
  //   if (result.success) {
  //     return {
  //       message: 'Thank you! Your response has been recorded.',
  //       status: 'success',
  //     };
  //   } else {
  //     throw new Error(result.error);
  //   }
  // } catch (error) {
  //   console.error(error);
  //   return {
  //     message: 'An error occurred while submitting the form. Please try again.',
  //     status: 'error',
  //   };
  // }
  // ====================================================================


  // For now, we'll just return a success message.
  return {
    message: 'Thank you! Your response has been recorded. (Backend not implemented)',
    status: 'success',
  };
}
