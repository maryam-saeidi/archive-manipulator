// field kibana.alert.time_range
export function add_time_range(alert) {
  const end = alert.value.source["kibana.alert.end"];
  const timestamp = alert.value.source["@timestamp"];
  const isRecovered = alert.value.source["kibana.alert.status"] === "recovered";
  const timeRange = {
    "kibana.alert.time_range": {
      gte: alert.value.source["kibana.alert.start"],
    },
  };

  if (isRecovered) {
    timeRange["kibana.alert.time_range"].lte = end ? end : timestamp;
  }

  return {
    ...alert,
    value: {
      ...alert.value,
      source: {
        ...alert.value.source,
        ...timeRange,
        "kibana.alert.end": end ? end : timestamp,
      },
    },
  };
}
