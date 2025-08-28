output "dynamodb_table_names" {
  description = "Names of DynamoDB tables"
  value = {
    users           = aws_dynamodb_table.users.name
    tackle          = aws_dynamodb_table.tackle_inventory.name
    waterbodies     = aws_dynamodb_table.waterbodies.name
    recommendations = aws_dynamodb_table.recommendations.name
  }
}

output "s3_bucket_name" {
  description = "S3 bucket name for website hosting"
  value       = aws_s3_bucket.website.bucket
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID"
  value       = aws_cloudfront_distribution.website.id
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution domain name"
  value       = aws_cloudfront_distribution.website.domain_name
}

output "aws_region" {
  description = "AWS region"
  value       = var.aws_region
}

output "environment" {
  description = "Environment name"
  value       = var.environment
}
