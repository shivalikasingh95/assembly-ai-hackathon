import boto3

def download_file_from_s3(input_file_path: str, s3_bucket_name: str):
    """
    This function meant for downloading a given midi file from s3
    Args:
        input_file_path (str): path of input file to be downloaded from s3
        s3_bucket_name (str): name of s3 bucket to be used for downloading
    """
    s3 = boto3.client("s3")
    s3.download_file(
        Bucket=s3_bucket_name, 
        Filename=input_file_path,
        Key=input_file_path,
    )
    return input_file_path

def upload_file_to_s3(input_file_path:str, s3_bucket_name: str):
    """
    This function meant for uploading a given mp3 file to s3
    Args:
        input_file_path (str): path of input file to be uploaded to s3
        s3_bucket_name (str): name of s3 bucket to be used for uploading
    """
    # Create an S3 access object
    s3 = boto3.client("s3")
    s3.upload_file(
        Filename=input_file_path,
        Bucket=s3_bucket_name,
        Key=input_file_path,
    )

