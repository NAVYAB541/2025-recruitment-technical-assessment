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

#[cfg(test)]
mod tests {
    use super::*;
    use axum::Json;
    use serde_json::json;

    #[tokio::test]
    async fn test_process_data() {
        let request = Json(DataRequest {
            data: vec![json!("Hello"), json!(1), json!(5), json!("World"), json!("!")],
        });

        let (status, Json(response)) = process_data(request).await.into_response();

        assert_eq!(status, StatusCode::OK);
        assert_eq!(response.string_len, 11);
        assert_eq!(response.int_sum, 6);
    }
}
