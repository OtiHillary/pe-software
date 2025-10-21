--               List of relations
--  Schema |      Name       | Type  |  Owner   
-- --------+-----------------+-------+----------
--  public | appraisal       | table | postgres
--  public | facilities      | table | postgres
--  public | goals           | table | postgres
--  public | index           | table | postgres
--  public | permission      | table | postgres
--  public | pesuser         | table | postgres
--  public | roles           | table | postgres
--  public | stress          | table | postgres
--  public | stress_scores   | table | postgres
--  public | userperformance | table | postgres

-- assessment
CREATE TABLE assessment (
   id SERIAL PRIMARY KEY,
   appraisal TEXT NOT NULL,
   performance TEXT NOT NULL,
   stress TEXT NOT NULL,
   status INT,
   day_started DATE,
   due_date DATE,
   user_id TEXT NOT NULL,
   CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES pesuser (name)
)
-- goals
CREATE TABLE goals (
   id SERIAL PRIMARY KEY,
   name TEXT NOT NULL,
   description TEXT NOT NULL,
   status INT,
   day_started DATE,
   due_date DATE,
   user_id TEXT NOT NULL,
   CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES pesuser (name)
);

-- pesuser
CREATE TABLE pesuser (
   id SERIAL,
   name VARCHAR(255) PRIMARY KEY NOT NULL,
   email VARCHAR(255) UNIQUE NOT NULL,
   password VARCHAR(255) NOT NULL,
   gsm VARCHAR(50),cls
   clscccccc
   role VARCHAR(50),
   address TEXT,
   faculty_college VARCHAR(255),
   dob DATE,
   doa DATE,
   poa VARCHAR(255),
   doc VARCHAR(255),
   post VARCHAR(255),
   dopp DATE,
   level VARCHAR(50),
   image VARCHAR(255),
   org VARCHAR(255)
);

-- roles
CREATE TABLE roles (
   id SERIAL,
   name VARCHAR(255) PRIMARY KEY NOT NULL,
   assigned INT,
   org VARCHAR(255)
);

-- permission
CREATE TABLE permission (
   id SERIAL PRIMARY KEY,
   manage_user TEXT,
   access_em TEXT,
      ae_all TEXT,
      ae_sub TEXT,
      ae_sel TEXT,
   define_performance TEXT,
      dp_all TEXT,
      dp_sub TEXT,
      dp_sel TEXT,
   access_hierachy TEXT,
   manage_review TEXT,
      mr_all TEXT,
      mr_sub TEXT,
      mr_sel TEXT,
      user_id VARCHAR(255),
      org VARCHAR(255),
   FOREIGN KEY (user_id) REFERENCES pesuser (name)
);

-- facilities
CREATE TABLE facilities (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    identification_symbol VARCHAR(100),
    location TEXT,
    facility_register_id_number VARCHAR(100),
    type VARCHAR(100),
    priority_rating VARCHAR(50),
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- index
CREATE TABLE "index" (
   id SERIAL PRIMARY KEY,
   redundancy NUMERIC,
   dept VARCHAR(255)
   productivity NUMERIC,
   utility NUMERIC,
   CONSTRAINT fk_pesuser FOREIGN KEY (user_id) REFERENCES pesuser (name)
);

-- appraisal
CREATE TABLE appraisal (
    id SERIAL PRIMARY KEY,
    pesuser_name VARCHAR(255) NOT NULL,        -- FK to pesuser(name) originally
    org VARCHAR(255),
    teaching_quality_evaluation NUMERIC(5,2),  -- allows decimals like 40.3
    research_quality_evaluation NUMERIC(5,2),
    administrative_quality_evaluation NUMERIC(5,2),
    community_quality_evaluation NUMERIC(5,2),
    other_relevant_information TEXT,
    dept VARCHAR(255)
);

-- stress
CREATE TABLE stress (
    id SERIAL PRIMARY KEY,
    pesuser_name VARCHAR(255) NOT NULL,              -- originally FK to pesuser(name)
    org VARCHAR(255),
    stress_theme INT,                          -- e.g. "occupational, personal"
    stress_feeling_frequency INT,              -- e.g. "often, rarely, weekly"
    dept VARCHAR(255)
);

-- userperformance
CREATE TABLE userperformance (
    id SERIAL PRIMARY KEY,
    pesuser_name VARCHAR(255) NOT NULL,     -- originally FK to pesuser(name)
    org VARCHAR(255),
    competence NUMERIC(5,2),                -- e.g. 73.5
    integrity NUMERIC(5,2),                 -- e.g. 41
    compatibility NUMERIC(5,2),             -- nullable
    use_of_resources NUMERIC(5,2),          -- nullable
    dept VARCHAR(255)
);

-- stress_category_settings
CREATE TABLE stress_scores (
    id SERIAL PRIMARY KEY,
    organizational INT,
    student INT,
    administrative INT,
    teacher INT,
    parents INT,
    occupational INT,
    personal INT,
    academic_program INT,
    negative_public_attitude INT,
    misc INT
);

-- Plans table
CREATE TABLE plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  paypal_plan_id TEXT UNIQUE NOT NULL,  
  name TEXT NOT NULL,
  price_cents INTEGER NOT NULL,          
  currency_code VARCHAR(10) NOT NULL,     
  billing_cycle_interval_unit VARCHAR(10) NOT NULL, 
  billing_cycle_interval_count INTEGER NOT NULL,    
  trial_days INTEGER DEFAULT 0,           
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pesuser_id UUID NOT NULL REFERENCES pesuser(id),
  plan_id UUID NOT NULL REFERENCES plans(id),
  paypal_subscription_id TEXT UNIQUE NOT NULL,  
  status VARCHAR(50) NOT NULL,  
  start_time TIMESTAMPTZ,        
  next_billing_time TIMESTAMPTZ, 
  last_billing_time TIMESTAMPTZ, 
  cancel_time TIMESTAMPTZ,       
  failed_payment_count INTEGER DEFAULT 0,
  metadata JSONB,               
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Subscription events table
CREATE TABLE subscription_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID NOT NULL REFERENCES subscriptions(id),
  event_type TEXT NOT NULL,      
  event_time TIMESTAMPTZ NOT NULL DEFAULT now(),
  raw_payload JSONB NOT NULL,     
  processed BOOLEAN NOT NULL DEFAULT FALSE
);

-- (
--    'Chika Okafor',
--    'chika.okafor@example.com',
--    'hashedpassword1',
--    '08012345678',
--    'auditor',
--    '12 Herbert Macaulay Way, Yaba, Lagos',
--    'Business Administration',
--    '1992-05-14',
--    '2020-01-10',
--    'Yaba',
--    '2020-01-11',
--    'Auditor I',
--    '2020-01-15',
--    'Senior',
--    'chika.jpg',
--    'university of lagos'
-- ),

CREATE TABLE personnel_utilization (
  id SERIAL PRIMARY KEY,
  org TEXT NOT NULL,
  b NUMERIC(10, 2),
  w NUMERIC(10, 2),
  p0 NUMERIC(6, 3),
  t1 NUMERIC(6, 3),
  t2 NUMERIC(6, 3),
  t3 NUMERIC(6, 3),
  t4 NUMERIC(6, 3),
  s0 NUMERIC(6, 3),
  g NUMERIC(10, 2),
  d NUMERIC(10, 2),
  y NUMERIC(6, 3),
  alpha NUMERIC(6, 3),
  lambda NUMERIC(6, 3),
  mu NUMERIC(6, 3),
  j NUMERIC(10, 2),
  kmin INTEGER,
  kmax INTEGER,
  kstar INTEGER,
  hstar NUMERIC(12, 6),
  constraints_ok BOOLEAN DEFAULT true,
  violations TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stress_analysis_results (
  id SERIAL PRIMARY KEY,
  org VARCHAR(255),
  group_by VARCHAR(50),                  -- 'dept' or 'stress_theme'
  ssto DOUBLE PRECISION,
  sstr DOUBLE PRECISION,
  sse DOUBLE PRECISION,
  f_statistic DOUBLE PRECISION,
  critical_value DOUBLE PRECISION,
  conclusion TEXT,
  df_between INT,
  df_within INT,
  ms_between DOUBLE PRECISION,
  ms_within DOUBLE PRECISION,
  mean DOUBLE PRECISION,
  std_dev DOUBLE PRECISION,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


