export interface Seller {
	id: string;
	first_name: string;
	middle_name: string;
	last_name: string;
	suffix: string;
	business_name: string;
	registered_address: string;
	zip_code: string;
	vat_status: string;
	seller_type: string;
	seller_id: string;
	created_at?: string;
	updated_at?: string;
	document_type: string;
	document_url: string;
	document_number: string;
	document_expiry_date: string;
	valid_id: string;
	valid_id_front: string;
	valid_id_back: string;
	status: string;
	remarks: string;
	tin_number: string;
	verified_by: string;
	verification_date: string;
	verification_remarks?: string;
}
