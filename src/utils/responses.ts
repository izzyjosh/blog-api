interface IMetadata {
  nextCursor?: string;
  totalCount?: number;
}

export interface ISuccess<TData> {
  status: "success";
  message?: string;
  data?: TData;
  metadata?: IMetadata;
}

export const successResponse = <TData>(
  data: Omit<ISuccess<TData>, "status">,
): ISuccess<TData> => {
  const response: ISuccess<TData> = {
    status: "success",
  };
  if (data.message !== undefined) {
    response.message = data.message;
  }
  if (data.data !== undefined) {
    response.data = data.data;
  }
  if (data.metadata !== undefined) {
    response.metadata = data.metadata;
  }

  return response;
};
