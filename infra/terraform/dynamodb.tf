# DynamoDB Tables for BiteBrain

resource "aws_dynamodb_table" "users" {
  name           = "${var.project_name}-${var.environment}-users"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "pk"
  
  attribute {
    name = "pk"
    type = "S"
  }

  tags = {
    Name        = "${var.project_name}-${var.environment}-users"
    Environment = var.environment
    Project     = var.project_name
  }
}

resource "aws_dynamodb_table" "tackle_inventory" {
  name           = "${var.project_name}-${var.environment}-tackle"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "pk"
  range_key      = "sk"
  
  attribute {
    name = "pk"
    type = "S"
  }
  
  attribute {
    name = "sk"
    type = "S"
  }

  tags = {
    Name        = "${var.project_name}-${var.environment}-tackle"
    Environment = var.environment
    Project     = var.project_name
  }
}

resource "aws_dynamodb_table" "waterbodies" {
  name           = "${var.project_name}-${var.environment}-waterbodies"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "pk"
  range_key      = "sk"
  
  attribute {
    name = "pk"
    type = "S"
  }
  
  attribute {
    name = "sk"
    type = "S"
  }

  tags = {
    Name        = "${var.project_name}-${var.environment}-waterbodies"
    Environment = var.environment
    Project     = var.project_name
  }
}

resource "aws_dynamodb_table" "recommendations" {
  name           = "${var.project_name}-${var.environment}-recommendations"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "pk"
  range_key      = "sk"
  
  attribute {
    name = "pk"
    type = "S"
  }
  
  attribute {
    name = "sk"
    type = "S"
  }

  tags = {
    Name        = "${var.project_name}-${var.environment}-recommendations"
    Environment = var.environment
    Project     = var.project_name
  }
}
