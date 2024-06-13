export const responseMessages = {
  response_success_get: 'Fetch Data Successfully',
  response_success_post: 'Create Data Successfully',
  response_success_put: 'Update Data Successfully',
  response_success_delete: 'Delete Data Successfully',
  response_error_get: 'Error While Fetch Data',
  response_error_post: 'Error While Create Data',
  response_error_put: 'Error While Update Data',
  response_error_delete: 'Error While Delete Data',
  No_document_found_with_the_provided_Id: (id: string) => `No_document_found_with_the_id ${id}`,
  unauthorized_access: 'Unauthorized access.',
  invalid_token: 'Invalid token',
  unauthorized_user: 'Unauthorized user',
  jwt_token_required: 'JWT token are required.',
  fields_cannot_modify: 'Fields cannot be modify',
  otp_verify_success: 'OTP verified successfully',
};
