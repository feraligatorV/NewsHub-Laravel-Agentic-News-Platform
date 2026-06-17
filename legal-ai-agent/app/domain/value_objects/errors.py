class LegalAiError(Exception):
    status_code = 400


class InvalidPdfUrlError(LegalAiError):
    status_code = 422


class PdfDownloadError(LegalAiError):
    status_code = 502


class PdfTextExtractionError(LegalAiError):
    status_code = 422


class AiConfigurationError(LegalAiError):
    status_code = 503


class AiGatewayError(LegalAiError):
    status_code = 502
