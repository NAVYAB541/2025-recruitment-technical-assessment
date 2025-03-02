use axum::{http::StatusCode, response::IntoResponse, Json};
use serde::{Deserialize, Serialize};

pub async fn process_data(Json(request): Json<DataRequest>) -> impl IntoResponse {
  let mut string_len = 0;
  let mut int_sum = 0;
    
  for value in request.data {
    if let Some(s) = value.as_str() {
      string_len += s.len();
    } else if let Some(n) = value.as_i64() {
      int_sum += n as i32;
    }
  }

  let response = DataResponse {
    string_len,
    int_sum,
  };

  (StatusCode::OK, Json(response))
}

#[derive(Deserialize)]
pub struct DataRequest {
  data: Vec<serde_json::Value>,
}

#[derive(Serialize)]
pub struct DataResponse {
  string_len: usize,
  int_sum: i32,
}
