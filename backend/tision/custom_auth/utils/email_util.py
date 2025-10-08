from django.core.mail import EmailMessage
import threading

class EmailThread(threading.Thread):
    def __init__(self, email):
        super().__init__()
        self.email = email
    def run(self):
        self.email.send()    
class Util:
    @staticmethod
    def send_email(email_data):
        email = EmailMessage(
            subject=email_data['email_subject'],
            body=email_data['email_body'],
            to=[email_data['to']],
        )
        EmailThread(email).start()
