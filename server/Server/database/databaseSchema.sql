create table tasks(
    tasksId BIGINT auto_increment primary key,
    task varchar(255) not null,
    taskDate date not null,
    startingTime timestamp not null,
    complete boolean not null,
    estimatedDuration integer not null,
    goalId varchar(6) not null,
    progress enum('In progress', 'Completed', 'Not Started') not null,
    privacy enum('private', 'public') default 'private',
    creator varchar(10) not null,
    foreign key (goalId) references weeklyGoals(wGoalId) on delete cascade,
    foreign key (creator) references registeredUsers(userId) on delete cascade
);



create table weeklyGoals (
  wGoalId varchar(6) NOT NULL primary key,
  goal varchar(255) NOT NULL,
  urgency int signed NOT NULL,
  importance int not null,
  weekStart date NOT NULL,
  weekEnd date NOT NULL,
  completed boolean not null default false,
  monthlyGoalId varchar(5) not null,
  goalPriority int not null,
  tasks json,
  privacy enum('private', 'public') default 'private',
  creator varchar(10) not null,
  foreign key (monthlyGoalId) references monthlyGoals(mGoalId) on delete cascade,
  foreign key (creator) references registeredUsers(userId) on delete cascade
);


create table monthlyGoals(
  mGoalId varchar(5) not null primary key,
  goal varchar(255) not null,
  urgency int not null,
  importance int not null,
  tasksInGoal json,
  estimatePeriodPerDay int not null default 30,
  complete boolean default false,
  goalPriority int not null,
  goalCategory enum("personal", "fitness", "family", "job", "project", "health", "other"),
  username varchar(50),
  monthStart date not null,
  privacy enum('private', 'public') default 'private',
  creator varchar(10) not null,
  foreign key (creator) references registeredUsers(userId) on delete cascade
);



create table expensesTable(
    expenseId varchar(6) primary key,
    budgetId varchar(5) null,
    item varchar(255) not null,
    amount double not null default 0,
    expenseDate date not null,
    paymentMethod enum('Cash', 'Card', 'Credit') default 'Cash',
    expenseCategeory enum('Food', 'Clothing', 'Family', 'Academics', 'Living', 'Travel'),
    expensePrivacy enum('private', 'public') default 'private',
    creator varchar(10) not null,
    foreign key (budgetId) references budgetTable(budgetId) on delete cascade,
    foreign key (creator) references registeredUsers(userId) on delete cascade
);


create table budgetTable(
    budgetId varchar(12) primary key,
    budget varchar(50) not null,
    amount double not null default 0,
    dateOfPayment date not null,
    goalId varchar(255),
    paid boolean default false,
    expenseCategory enum('Food', 'Clothing', 'Family', 'Academics', 'Living', 'Travel'),
    budgetPrivacy enum('private', 'public') default 'private',
    creator varchar(10) not null,
    foreign key (goalId) references weeklyGoals(wGoalId) on delete cascade,
    foreign key (creator) references registeredUsers(userId) on delete cascade
);


create table notesTable (
    noteId int primary key auto_increment,
    title varchar(255) not null,
    note text,
    dateCreated date,
    media json,
    notePrivacy enum('private', 'public') default 'private',
    creator varchar(10) not null,
    foreign key (creator) references registeredUsers(userId) on delete cascade
);


create table registeredUsers (
    userId varchar(10) primary key,
    fullName varchar(255) not null,
    username varchar(255) not NULL unique,
    email varchar(255) not null unique,
    mobile varchar(20) not null,
    userPassword text,
    userLoginData json,
    validRefreshTokens json,
    verifiedEmail boolean default false,
    verifiedMobile boolean default false,
);


-- user_login_data {
--     date_logged_in,
--     computer: 
--     ip_address
--     session_duration
--     access_logs: []
-- }

-- DELIMITER //
-- CREATE TRIGGER calculate_goal_priority
-- BEFORE INSERT ON weeklyGoals
-- FOR EACH ROW
-- BEGIN
--     SET NEW.goalPriority = NEW.urgency + NEW.importance;
-- END;
-- //
-- DELIMITER ;

-- DELIMITER //
-- CREATE TRIGGER recalculate_goal_priority
-- BEFORE UPDATE ON weeklyGoals
-- FOR EACH ROW
-- BEGIN
--     IF NEW.urgency <> OLD.urgency OR NEW.importance <> OLD.importance THEN
--         SET NEW.goalPriority = NEW.urgency + NEW.importance;
--     END IF;
-- END;
-- //
-- DELIMITER ;



-- DELIMITER //
-- CREATE TRIGGER calculate_month_priority
-- BEFORE INSERT ON monthlyGoals
-- FOR EACH ROW
-- BEGIN
--     SET NEW.goalPriority = NEW.urgency + NEW.importance;
-- END;
-- //
-- DELIMITER ;

-- DELIMITER //
-- CREATE TRIGGER recalculate_monthly_priority
-- BEFORE UPDATE ON monthlyGoals
-- FOR EACH ROW
-- BEGIN
--     IF NEW.urgency <> OLD.urgency OR NEW.importance <> OLD.importance THEN
--         SET NEW.goalPriority = NEW.urgency + NEW.importance;
--     END IF;
-- END;
-- //
-- DELIMITER ;

DELIMITER //
CREATE TRIGGER BeforeInsertBudget
BEFORE INSERT ON budgetTable
FOR EACH ROW
BEGIN
    DECLARE currentYear INT;
    DECLARE currentMonth INT;
    DECLARE budgetCount INT;
    DECLARE newBudgetId VARCHAR(255);

    SET currentYear = YEAR(NOW());
    SET currentMonth = MONTH(NOW());

    SELECT COUNT(*) INTO budgetCount
    FROM budgetTable
    WHERE LEFT(budgetId, 6) = CONCAT('BU', currentYear, LPAD(currentMonth, 2, '0'));

    SET newBudgetId = CONCAT('BU', currentYear, LPAD(currentMonth, 2, '0'), LPAD(budgetCount + 101, 3, '0'));

    SET NEW.budgetId = newBudgetId;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER BeforeInsertExpense
BEFORE INSERT ON expensesTable
FOR EACH ROW
BEGIN
    DECLARE currentYear INT;
    DECLARE currentMonth INT;
    DECLARE expenseCount INT;
    DECLARE newExpenseId VARCHAR(6);

    SET currentYear = YEAR(NOW());
    SET currentMonth = MONTH(NOW());

    SELECT COUNT(*) INTO expenseCount
    FROM expensesTable
    WHERE LEFT(expenseId, 6) = CONCAT('EX', currentYear, LPAD(currentMonth, 2, '0'));

    SET newExpenseId = CONCAT('EX', currentYear, LPAD(currentMonth, 2, '0'), LPAD(expenseCount + 101, 3, '0'));

    SET NEW.expenseId = newExpenseId;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER BeforeInsertMonthlyGoal
BEFORE INSERT ON monthlyGoals
FOR EACH ROW
BEGIN
    DECLARE currentYear INT;
    DECLARE currentMonth INT;
    DECLARE goalCount INT;
    DECLARE newMGoalId VARCHAR(5);

    SET currentYear = YEAR(NOW());
    SET currentMonth = MONTH(NOW());

    SELECT COUNT(*) INTO goalCount
    FROM monthlyGoals
    WHERE LEFT(mGoalId, 6) = CONCAT('MG', currentYear, LPAD(currentMonth, 2, '0'));

    SET newMGoalId = CONCAT('MG', currentYear, LPAD(currentMonth, 2, '0'), LPAD(goalCount + 101, 3, '0'));

    SET NEW.mGoalId = newMGoalId;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER BeforeInsertWeeklyGoal
BEFORE INSERT ON weeklyGoals
FOR EACH ROW
BEGIN
    DECLARE currentYear INT;
    DECLARE currentMonth INT;
    DECLARE goalCount INT;
    DECLARE newWGoalId VARCHAR(6);

    SET currentYear = YEAR(NOW());
    SET currentMonth = MONTH(NOW());

    SELECT COUNT(*) INTO goalCount
    FROM weeklyGoals
    WHERE LEFT(wGoalId, 6) = CONCAT('WG', currentYear, LPAD(currentMonth, 2, '0'));

    SET newWGoalId = CONCAT('WG', currentYear, LPAD(currentMonth, 2, '0'), LPAD(goalCount + 101, 3, '0'));

    SET NEW.wGoalId = newWGoalId;
END //
DELIMITER ;






-- DELIMITER //
-- CREATE TRIGGER generate_monthly_id
-- BEFORE INSERT ON monthlyGoals
-- FOR EACH ROW
-- BEGIN
--     DECLARE total_count INT;
--     DECLARE new_code VARCHAR(5);

--     SELECT COUNT(*) INTO total_count FROM monthlyGoals;

--     SET new_code = CONCAT(
--         CHAR(65 + (total_count + 1) DIV 26),
--         CHAR(65 + (total_count + 1) MOD 26),
--         LPAD((total_count + 1) MOD 1000, 3, '0')
--     );

--     SET NEW.mGoalId = new_code;
-- END;
-- //
-- DELIMITER ;

-- DELIMITER //
-- CREATE TRIGGER generate_weekly_id
-- BEFORE INSERT ON weeklyGoals
-- FOR EACH ROW
-- BEGIN
--     DECLARE current_count INT;
--     DECLARE new_letter1 INT;
--     DECLARE new_letter2 INT;
--     DECLARE new_number INT;
--     DECLARE new_code VARCHAR(5);

--     SELECT COUNT(*) INTO current_count FROM weeklyGoals;

--     SET new_letter1 = 65 + (current_count DIV 10000);    -- First letter (A to Z)
--     SET new_letter2 = 65 + (current_count DIV 260000);   -- Second letter (A to Z)
--     SET new_letter1 = new_letter1 MOD 26 + 65;           -- Calculate the ASCII code for the first letter
--     SET new_letter2 = new_letter2 MOD 26 + 65;           -- Calculate the ASCII code for the second letter
--     SET new_number = (current_count MOD 10000) + 1;       -- Number part, incremented by 1

--     SET new_code = (
--         SELECT
--             CONCAT(
--                 CHAR(new_letter2),
--                 CHAR(new_letter1),
--                 LPAD(new_number, 4, '0')
--             )
--     );

--     SET NEW.wGoalId = new_code;
-- END //

-- DELIMITER ;


-- DELIMITER //
-- CREATE TRIGGER generate_monthly_id
-- BEFORE INSERT ON monthlyGoals
-- FOR EACH ROW
-- BEGIN
--     DECLARE current_count INT;
--     DECLARE new_letter1 INT;
--     DECLARE new_letter2 INT;
--     DECLARE new_number INT;
--     DECLARE new_code VARCHAR(5);

--     SELECT COUNT(*) INTO current_count FROM monthlyGoals;

--     SET new_letter1 = 65 + (current_count DIV 1000);    
--     SET new_letter2 = 65 + (current_count DIV 26000);   
--     SET new_letter1 = new_letter1 MOD 26 + 65;           
--     SET new_letter2 = new_letter2 MOD 26 + 65;         
--     SET new_number = (current_count MOD 1000) + 1;       

--     SET new_code = (
--         SELECT
--             CONCAT(
--                 CHAR(new_letter2),
--                 CHAR(new_letter1),
--                 LPAD(new_number, 3, '0')
--             )
--     );

--     SET NEW.mGoalId = new_code;
-- END //

-- DELIMITER ;



-- DELIMITER //
-- CREATE TRIGGER generate_expense_identifier
-- BEFORE INSERT ON expensesTable
-- FOR EACH ROW
-- BEGIN
--     DECLARE new_identifier VARCHAR(6);
--     DECLARE num_items INT;

--     SELECT COUNT(*) INTO num_items FROM expensesTable;

--     IF num_items < 1000 THEN
--         SET new_identifier = CONCAT('E', 'A', 'A', LPAD(num_items + 1, 3, '0'));
--     ELSE
--         SET new_identifier = CONCAT('E', 'A', CHAR(ASCII('A') + (FLOOR((num_items - 999) / 26))), '001');
--         IF ASCII(new_identifier) > ASCII('Z') THEN
--             SET new_identifier = CONCAT('E', CHAR(ASCII('A') + (FLOOR((num_items - 999) / 26))), 'A', '001');
--         END IF;
--     END IF;


--     set new.expenseId = new_identifier;


-- END;
-- //
-- DELIMITER ;



