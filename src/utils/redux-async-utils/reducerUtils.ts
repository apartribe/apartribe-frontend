export const reducerUtils = {
  initial: (initialData = null) => ({
    loading: false,
    data: initialData,
    error: null,
  }),
  loading: (prevState = null) => ({
    loading: true,
    data: prevState,
    error: null,
  }),
  success: (payload: any) => ({
    // TODO: 타입 수정 요망
    loading: false,
    data: payload,
    error: null,
  }),
  error: (error: any) => ({
    // TODO: 타입 수정 요망
    loading: false,
    data: null,
    error: error,
  }),
}
