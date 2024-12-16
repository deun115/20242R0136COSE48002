# DeepPlant Backend Server

<div align="center">
<img width="300" alt="image" src="https://raw.githubusercontent.com/SincerityHun/Deep_Plant1_Final/main/web/images/l_deeplant.png">

</div>

> 고려대학교 산학협력프로젝트 딥플랜트
>
> 개발기간: 2024.05 ~ 2024.12
>
> Built with Python

## Project Tech Stack

### Environment

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)

### Release

![Amazone EC2](https://img.shields.io/badge/Amazon%20EC2-FF9900?style=for-the-badge&logo=amazon-ec2&logoColor=white)
![Amazone S3](https://img.shields.io/badge/Amazon%20S3-569A31?style=for-the-badge&logo=amazon-s3&logoColor=white)
![Amazone RDS](https://img.shields.io/badge/Amazon%20RDS-527FFF?style=for-the-badge&logo=amazon-rds&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white)
![Github Action](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Grafana](https://img.shields.io/badge/grafana-%23F46800.svg?style=for-the-badge&logo=grafana&logoColor=white)

### Development

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=Flask&logoColor=white)
![Postgresql](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=Postgresql&logoColor=white)

### Communication

![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white)

## Production 배포 방법

1. git repository clone

2. [환경 변수 및 Secret 변수 설정]

3. git push origin main

## 환경 변수 및 Secret 변수

1. AWS_ACCESS_KEY_ID

   - AWS Access 공개키
   - S3 storage 접근용

2. AWS_SECRET_ACCESS_KEY

   - AWS Access 비밀키
   - S3 storage 접근용

3. DB_URI

   - Database 엔진 주소

4. APPLICATION_NAME

   - CodeDeploy를 활용한 배포 시 필요한 애플리케이션명

5. DEPLOYMENT_GROUP

   - CodeDeploy를 활용한 배포 시 필요한 배포 그룹명

6. S3_BUCKET_NAME

   - AWS S3 System Storage Bucket Name

7. S3_REGION_NAME

   - AWS S3 region Name
   - e.g., ap-northeast-2

8. FIREBASE_BUCKET_ADDRESS

   - Google Firebase Storage Bucket Address

9. SERVICEACCOUNTKEY

   - Google serviceAccountKey.json 파일(python용)

## Server 로컬 실행
### 1) Docker-Compose로 실행하기

1. cd test-flask/
   - docker-compose.yml 파일이 위치한 경로로 이동
2. docker ps
3. docker compose version
   - 도커와 도커 컴포즈 설치 여부 확인
4. ``sudo docker-compose up-d``
   - docker compose build 및 실행
  
### 2) 가상환경을 통해 로컬에서 실행하기
1. ``python3 -m venv venv``
2. ``source venv/bin/activate``
     - 가상환경 생성 및 실행
4. cd test-backend/
5. ``docker run -d -p 5000:5000 --name mlflow-server ghcr.io/mlflow/mlflow mlflow server --host 0.0.0.0``
     - 공식 도커 이미지를 활용하여 mlflow 서버 키기
6. ``pip install -r requirements-dev.txt``
     - 서버 실행에 필요한 파이썬 패키지 설치
8. ``gunicorn --bind 0.0.0.0:8080 --workers 2 --timeout 600 app:app``
     - flask 서버 실행
     - 만약 터미널에서 로그 확인하고 싶다면 ``--log-level [info|debug]`` argument 추가

## Server Architecture

<img width="800" alt="image" src="https://github.com/user-attachments/assets/074f9dc5-c115-4475-aaab-517b2632c9e7">

## DB ERD

<img width="800" alt="image" src="https://github.com/user-attachments/assets/9b4a2364-4900-4bcf-a1b3-a287347178ce">

## Code Architecture

```
├─ test-backend
│ ├─ .gitignore
│ ├─ docker-compose.yml
│ ├─ prometheus-grafana                           // 메트릭 모니터링을 위한 grafana docker 및 config
│ │    ├─ docker-compose.yml
│ │    └─ prometheus
│ │        └─ config
│ │              ├─ prometheus.yml
│ │              └─ rule.yml
│ └─ test-flask
│      ├─ .env
│      ├─ Dockerfile
│      ├─ api
│      │    ├─ add_api.py                         // 육류 데이터 등록 API
│      │    ├─ delete_api.py                      // 육류 데이터 삭제 API
│      │    ├─ get_api.py                         // 육류 데이터 조회 API
│      │    ├─ predict_api.py                     // 육류 데이터 예측 API
│      │    ├─ statistic_api.py                   // 육류 데이터 통계수치 조회 API
│      │    ├─ update_api.py                      // 육류 데이터 수정 API
│      │    └─ user_api.py                        // 사용자 관련 API
│      ├─ app.py
│      ├─ appspec.yml                             // Code Deploy 배포 생애주기 관리 yml 파일
│      ├─ configs
│      │    ├─ check-user-count.py                // RDS와 Firebase의 유저정보 정합성 관리 코드
│      │    ├─ register-model.py                  // S3로부터의 모델 로드 및 mlflow 등록 코드
│      ├─ connection
│      │    ├─ firebase_connect.py
│      │    └─ s3_connect.py
│      ├─ db
│      │    ├─ db_controller.py                   // DB 접근 메서드 파일
│      │    └─ db_model.py                        // DB 초기화 및 스키마 정의 파일
│      ├─ log
│      │    └─ app.log
│      ├─ package-lock.json
│      ├─ requirements-dev.txt                    // ML서버 의존성
│      ├─ requirements.txt                        // 레거시 백엔드 서버 의존성
│      ├─ scripts                                 // 배포 생애주기 별 동작 스크립트
│      │    ├─ after_install.sh
│      │    ├─ application_stop.sh
│      │    ├─ before_install.sh
│      │    ├─ register_flask_service.sh          // flask-app.service 파일 등록 스크립트
│      │    ├─ register_model_from_s3.sh          // s3에서 모델 로드를 위한 service 및 timer 등록 스크립트
│      │    ├─ start_flask.sh
│      │    ├─ start_user_count_service.sh        // 유저정보 정합성 검증 service 및 timer 등록 스크립트
│      │    └─ validate_service.sh
│      ├─ serviceAccountKey.json
│      ├─ tests                                   // 메서드 단위 테스트 코드
│      │    ├─ __init__.py
│      │    ├─ conftest.py
│      │    ├─ test_add_api.py
│      │    ├─ test_get_api.py
│      │    ├─ test_index.py
│      │    ├─ test_predict_api.py
│      │    └─ test_update_api.py
│      └─ utils
│           ├─ ml_utils.py                        // ML모델 활용 메서드 - 추론, 전처리, 시각화, xai 생성 등
│           ├─ opencv_utils.py                    // OpenCV 활용 메서드
│           ├─ segmentation.py                    // U-Net segmentation 로드 후 단면 이미지 추출 메서드
│           └─ utils.py                           // 타입 정의 및 데이터 전처리 메서드

```

## 서버 개발자

|                                        양은서 (Eunseo Yang)                                         |                                        이원준 (Wonjun Lee)                                        |
| :-------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------: |
| <img width="160px" src="https://avatars.githubusercontent.com/u/141890722?v=4" alt="Eunseo Yang" /> | <img width="160px" src="https://avatars.githubusercontent.com/u/97330728?v=4" alt="Wonjun Lee" /> |
|                           [GitHub: @deun115](https://github.com/deun115)                            |                        [GitHub: @wonjuneee](https://github.com/wonjuneee)                         |
|                                     고려대학교 컴퓨터학과 4학년                                     |                                    고려대학교 컴퓨터학과 3학년                                    |
