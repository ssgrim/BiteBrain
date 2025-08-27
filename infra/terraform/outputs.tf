output "dynamodb_table_names" {
  description = "Names of DynamoDB tables"
  value = {
    users           = aws_dynamodb_table.users.name
    tackle          = aws_dynamodb_table.tackle_inventory.name
    waterbodies     = aws_dynamodb_table.waterbodies.name
    recommendations = aws_dynamodb_table.recommendations.name
  }
}

output "aws_region" {
  description = "AWS region"
  value       = var.aws_region
}

output "environment" {
  description = "Environment name"
  value       = var.environment
}
