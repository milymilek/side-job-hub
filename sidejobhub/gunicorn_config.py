from multiprocessing import cpu_count

bind = '0.0.0.0:8000'  # Specify the desired host and port for your combined application
workers = cpu_count() * 2 + 1  # Adjust the number of workers according to your requirements
reload = True  # Enable auto-reloading for development purposes

def post_fork(server, worker):
    # Code to initialize your chat application here
    pass
