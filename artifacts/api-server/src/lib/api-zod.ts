type HealthStatus = {
  status: string;
};

export const HealthCheckResponse = {
  parse(input: unknown): HealthStatus {
    if (
      typeof input === "object" &&
      input !== null &&
      "status" in input &&
      typeof (input as { status: unknown }).status === "string"
    ) {
      return { status: (input as { status: string }).status };
    }

    throw new Error("Invalid health response shape");
  },
};
