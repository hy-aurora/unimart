/**
 * Email templates for various communications
 */

export const sizingAppointmentConfirmation = (
  data: {
    name: string;
    date?: string;
    time?: string;
    schoolName: string;
    notes?: string;
  }
) => {
  return `
Dear ${data.name},

We're pleased to confirm your sizing appointment ${
    data.date ? `on ${data.date}` : ""
  }${data.time ? ` at ${data.time}` : ""} at ${data.schoolName}.

${
  data.notes
    ? `Additional Notes: ${data.notes}\n\n`
    : ""
}
Please arrive 10 minutes before your scheduled time with your student ID. If you need to reschedule, please contact us at least 24 hours in advance.

Thank you for choosing UniMart for your uniform needs.

Best regards,
The UniMart Team
`;
};

export const sizingAppointmentCancellation = (
  data: {
    name: string;
    schoolName: string;
    reason?: string;
  }
) => {
  return `
Dear ${data.name},

We regret to inform you that your sizing appointment at ${data.schoolName} has been cancelled.

${
  data.reason
    ? `Reason: ${data.reason}\n\n`
    : ""
}
Please feel free to book another appointment at your convenience through our website. We apologize for any inconvenience this may have caused.

Best regards,
The UniMart Team
`;
};

export const contactQueryResponse = (
  data: {
    name: string;
    subject?: string;
    message: string;
  }
) => {
  return `
Dear ${data.name},

Thank you for reaching out to us${
    data.subject ? ` regarding "${data.subject}"` : ""
  }.

${data.message}

If you have any further questions, please don't hesitate to contact us.

Best regards,
The UniMart Team
`;
};
