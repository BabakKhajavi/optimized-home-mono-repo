import axios from 'axios';

const defaultOptions: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const apiClient = async <T>(
  endpoint: string,
  options: RequestInit = {},
  cacheOptions: RequestCache = 'default',
): Promise<T> => {
  const fetchOptions: RequestInit = {
    ...defaultOptions,
    ...options,
    cache: cacheOptions || 'default', // Default if undefined
  };
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`;
  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const errorText = await response.text(); // Fetch error details
    throw new Error(
      `HTTP error at ${url}! Status: ${response.status}, Details: ${errorText}`,
    );
  }

  return response.json();
};

export const get = async <T>(
  url: string,
  params: Record<string, any> = {},
  cacheOptions?: RequestCache,
  revalidateOptions: RequestMode = 'cors',
  nextOptions?: { revalidate: number },
): Promise<T> => {
  const queryString = new URLSearchParams(params).toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  const options: RequestInit = { method: 'GET', mode: revalidateOptions };
  if (nextOptions) {
    options.headers = {
      ...options.headers,
      'Next-Revalidate': nextOptions.revalidate.toString(),
    };
  }

  return apiClient<T>(
    fullUrl,
    options, // Revalidation applies here
    cacheOptions ?? 'force-cache',
  );
};

export const post = async <T>(
  url: string,
  data: any,
  cacheOptions?: RequestCache,
): Promise<T> => {
  return apiClient<T>(
    url,
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
    cacheOptions ?? 'no-store',
  );
};

export const put = async <T>(
  url: string,
  data: any,
  cacheOptions?: RequestCache,
): Promise<T> => {
  return apiClient<T>(
    url,
    {
      method: 'PUT',
      body: JSON.stringify(data),
    },
    cacheOptions ?? 'no-store',
  );
};

export const del = async <T>(
  url: string,
  cacheOptions?: RequestCache,
): Promise<T> => {
  return apiClient<T>(
    url,
    {
      method: 'DELETE',
    },
    cacheOptions ?? 'no-store',
  );
};

export const fetchQuery = async (id: string) => {
  const { data } = await axios.get(`/subcategory/${id}`);
  return data;
};
