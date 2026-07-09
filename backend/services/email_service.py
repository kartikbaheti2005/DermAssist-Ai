import smtplib

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from core.config import (
    EMAIL_USER,
    EMAIL_PASSWORD,
    FRONTEND_URLS,
)


def send_reset_email(
    to_email: str,
    full_name: str,
    reset_token: str,
) -> bool:

    reset_link = (
        f"{FRONTEND_URL}"
        f"/reset-password?token={reset_token}"
    )

    html_body = f"""
    <html>
        <body>
            <h2>DermAssist AI</h2>

            <p>Hello {full_name},</p>

            <p>
                We received a request to reset your password.
            </p>

            <p>
                <a href="{reset_link}">
                    Reset Password
                </a>
            </p>

            <p>
                This link expires in 30 minutes.
            </p>

            <p>
                If you did not request this,
                please ignore this email.
            </p>
        </body>
    </html>
    """

    text_body = f"""
Hello {full_name}

Reset Password:

{reset_link}

This link expires in 30 minutes.

DermAssist AI
"""

    try:

        msg = MIMEMultipart("alternative")

        msg["Subject"] = (
            "Reset Your DermAssist AI Password"
        )

        msg["From"] = (
            f"DermAssist AI <{EMAIL_USER}>"
        )

        msg["To"] = to_email

        msg.attach(
            MIMEText(text_body, "plain")
        )

        msg.attach(
            MIMEText(html_body, "html")
        )

        with smtplib.SMTP_SSL(
            "smtp.gmail.com",
            465
        ) as server:

            server.login(
                EMAIL_USER,
                EMAIL_PASSWORD
            )

            server.sendmail(
                EMAIL_USER,
                to_email,
                msg.as_string()
            )

        return True

    except Exception as e:

        print(
            f"Email sending failed: {e}"
        )

        return False