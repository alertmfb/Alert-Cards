export interface Branch {
  id: string;
  name: string;
}

export interface BranchesResponse {
  status: "success";
  data: Branch[];
}
