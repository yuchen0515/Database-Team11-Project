#include <stdio.h>
#include <iostream>
#include <stdint.h>
#include <string.h>
#include <stdbool.h>
#include <random>
#include <sstream>
#include <chrono>

#define NAME_LEN 128

using namespace std;
mt19937 rng(std::chrono::system_clock::now().time_since_epoch().count());

class UserData {
    public:
        void print() {
            std::string res = "INSERT INTO UserData VALUES (";
            res += ("\'" + account_ID + "\',"  );
            res += ("\'" + password   + "\',"  );
            res += ("\'" + name       + "\',"  );
            res += ("\'" + preference + "\'"  );
            res += ");";
            std::cout << res;
        }
        std::string account_ID;
        std::string password;
        std::string name;
        std::string preference;
};

class Stuff {
    public:
        void print() {
            std::string res = "INSERT INTO Stuff VALUES (";
            res += ("\'" +     stuff_ID                        + "\',"  );
            res += ("\'" +     account_ID                      + "\',"  );
            res += ("\'" +     record_date_start_date          + "\',"  );
            res += ("\'" +     record_date_start_time          + "\',"  );
            res += ("\'" +     record_date_end_date            + "\',"  );
            res += ("\'" +     record_date_end_time            + "\',"  );
            res += ("\'" +     to_string(status)               + "\'"  );
            res += ");";
            std::cout << res;  
        }

        std::string stuff_ID;
        std::string account_ID;

        std::string record_date_start_date;
        std::string record_date_start_time;
        std::string record_date_end_date;
        std::string record_date_end_time;

        char status;
};

class Event {
    public:
        void print() {
            std::string res = "INSERT INTO Event VALUES (";
            res += ("\'" +     event_ID                     + "\',"  );
            res += ("\'" +     account_ID                      + "\',"  );
            res += ("\'" +     time_start_date          + "\',"  );
            res += ("\'" +     time_start_time          + "\',"  );
            res += ("\'" +     time_end_date            + "\',"  );
            res += ("\'" +     time_end_time            + "\',"  );
            res += ("\'" +     buf_time                 + "\',"  );
            res += ("\'" +     title                    + "\',"  );
            res += ("\'" +     content                    + "\',"  );
            res += ("\'" +     to_string(status)               + "\'"  );
            res += ");";
            std::cout << res;  
        }
        std::string event_ID;
        std::string account_ID;

        std::string time_start_date;
        std::string time_start_time;
        std::string time_end_date;
        std::string time_end_time;

        std::string buf_time;
        std::string title;
        std::string content;

        char status;
};

class Project {
    public:
        void print() {
            std::string res = "INSERT INTO Project VALUES (";
            res += ("\'" +     project_ID   + "\',"  );
            res += ("\'" +     account_ID                      + "\',"  );

            res += ("\'" +     deadline_start_date          + "\',"  );
            res += ("\'" +     deadline_start_time          + "\',"  );
            res += ("\'" +     deadline_end_date            + "\',"  );
            res += ("\'" +     deadline_end_time            + "\',"  );

            res += ("\'" +     to_string(importance)                 + "\',"  );
            res += ("\'" +     title                    + "\',"  );
            res += ("\'" +     tag                    + "\',"  );
            res += ("\'" +     intro                    + "\',"  );
            res += ("\'" +     to_string(status)               + "\'"  );
            res += ");";
            std::cout << res;  
        }
        std::string project_ID;
        std::string account_ID;

        std::string deadline_start_date;
        std::string deadline_start_time;
        std::string deadline_end_date;
        std::string deadline_end_time;

        int32_t importance;

        std::string title;
        std::string tag;
        std::string intro;

        char status;
};

class Task {
    public:
        void print() {
            std::string res = "INSERT INTO Task VALUES (";
            res += ("\'" +     task_ID                      + "\',"  );
            res += ("\'" +     project_ID   + "\',"  );
            res += ("\'" +     destination  + "\',"  );

            res += ("\'" +     time_req_start_date          + "\',"  );
            res += ("\'" +     time_req_start_time          + "\',"  );
            res += ("\'" +     time_req_end_date            + "\',"  );
            res += ("\'" +     time_req_end_time            + "\',"  );

            res += ("\'" +     to_string(status)               + "\',"  );
            res += ("\'" +     to_string(highlight)               + "\'"  );
            res += ");";
            std::cout << res;  
        }
        std::string task_ID;
        std::string project_ID;

        std::string destination;

        std::string time_req_start_date;
        std::string time_req_start_time;
        std::string time_req_end_date;
        std::string time_req_end_time;

        char status;
        char highlight;
};


std::string gen_ran_string(int32_t len, int32_t type) {
    std::string data;

    for (int32_t i = 0 ; i < len; i += 1) {
        int32_t choose = rng() % 3;
        if (type == 1) { // number
            choose = 2;
        }
        int32_t ran = rng() % ('Z' - 'A' + 1);
        char s;
        if (choose == 0) {
            s = ran + 'A';
        } else if (choose == 1){
            s = ran + 'a';
        } else {
            s = rng() % 10 + '0';
        }

        data += s;
    }
    return data;
}

std::string add_zero_string(int32_t num) {
    std::string s_num = to_string(num);
    if (num < 10) {
        s_num = '0' + s_num;
    }

    return s_num;
}

std::string gen_ran_date() {
    int32_t year = rng() % 500 + (2021 - 500);
    int32_t month = rng() % 12 + 1;
    int32_t day = rng() % 28 + 1;

    std::string s_month = add_zero_string(month);
    std::string s_day = add_zero_string(day);

    return to_string(year) + '-' + s_month + '-' + s_day;
}

std::string gen_ran_time() {
    int32_t hour = rng() % 24;
    int32_t min = rng() % 60;
    int32_t sec = rng() % 60;

    std::string s_hour = add_zero_string(hour);
    std::string s_min = add_zero_string(min);
    std::string s_sec = add_zero_string(sec);

    return s_hour + ':' + s_min + ':' + s_sec;
}

UserData gen_ran_UserData() {
    UserData TEMP;
    TEMP.account_ID = gen_ran_string(8, 1);
    TEMP.password = gen_ran_string(15, 0);
    TEMP.name = gen_ran_string(30, 0);
    //TEMP.preference = gen_ran_string(rng() % 500, 0);
    TEMP.preference = gen_ran_string(rng() % 50, 0);


    return TEMP;
}

char gen_ran_status() {
    int32_t choose = rng() % 3;
    char TEMP;

    switch (choose) {
        case 0:
            TEMP = 'Y';
            break;
        case 1:
            TEMP = 'N';
            break;
        case 2:
            TEMP = 'A';
            break;
    }
    return TEMP;
}

Stuff gen_ran_Stuff() {
    Stuff TEMP;
    TEMP.stuff_ID = gen_ran_string(8, 1);
    TEMP.account_ID = gen_ran_string(8, 1);

    auto date_fir = gen_ran_date();
    auto date_sec = gen_ran_date();

    TEMP.record_date_start_date = (date_fir < date_sec) ? date_fir : date_sec;
    TEMP.record_date_end_date = (date_fir > date_sec) ? date_fir : date_sec;

    auto time_fir = gen_ran_time();
    auto time_sec = gen_ran_time();

    TEMP.record_date_start_time = gen_ran_time();
    TEMP.record_date_end_time = gen_ran_time();

    if (date_fir == date_sec) {
        TEMP.record_date_start_time = (time_fir < time_sec) ? time_fir : time_sec;
        TEMP.record_date_end_time = (time_fir > time_sec) ? time_fir : time_sec;

    }

    TEMP.status = gen_ran_status();


    return TEMP;
}

Event gen_ran_Event() {
    Event TEMP;
    TEMP.event_ID = gen_ran_string(8, 1);
    TEMP.account_ID = gen_ran_string(8, 1);

    auto date_fir = gen_ran_date();
    auto date_sec = gen_ran_date();

    TEMP.time_start_date = (date_fir < date_sec) ? date_fir : date_sec;
    TEMP.time_end_date = (date_fir > date_sec) ? date_fir : date_sec;

    auto time_fir = gen_ran_time();
    auto time_sec = gen_ran_time();

    TEMP.time_start_time = gen_ran_time();
    TEMP.time_end_time = gen_ran_time();

    if (date_fir == date_sec) {
        TEMP.time_start_time = (time_fir < time_sec) ? time_fir : time_sec;
        TEMP.time_end_time = (time_fir > time_sec) ? time_fir : time_sec;

    }

    TEMP.buf_time = gen_ran_time();

    //TEMP.title = gen_ran_string(rng() % 50 + 1 , 0);
    TEMP.title = gen_ran_string(rng() % 10 + 1 , 0);
    //TEMP.content = gen_ran_string(rng() % 500 + 1 , 0);
    TEMP.content = gen_ran_string(rng() % 50 + 1 , 0);
    TEMP.status = gen_ran_status();

    return TEMP;
}

Project gen_ran_Project () {
    Project TEMP;
    TEMP.project_ID = gen_ran_string(8, 1);
    TEMP.account_ID = gen_ran_string(8, 1);

    auto date_fir = gen_ran_date();
    auto date_sec = gen_ran_date();

    TEMP.deadline_start_date = (date_fir < date_sec) ? date_fir : date_sec;
    TEMP.deadline_end_date = (date_fir > date_sec) ? date_fir : date_sec;

    auto time_fir = gen_ran_time();
    auto time_sec = gen_ran_time();

    TEMP.deadline_start_time = gen_ran_time();
    TEMP.deadline_end_time = gen_ran_time();

    if (date_fir == date_sec) {
        TEMP.deadline_start_time = (time_fir < time_sec) ? time_fir : time_sec;
        TEMP.deadline_end_time = (time_fir > time_sec) ? time_fir : time_sec;

    }

    TEMP.importance = rng() % 100;

    //TEMP.title = gen_ran_string(rng() % 50 + 1 , 0);
    TEMP.title = gen_ran_string(rng() % 10 + 1 , 0);
    TEMP.tag = gen_ran_string(2, 0);

    //TEMP.intro = gen_ran_string(rng() % 500 + 1 , 0);
    TEMP.intro = gen_ran_string(rng() % 50 + 1 , 0);
    TEMP.status = gen_ran_status();

    return TEMP;
}

Task gen_ran_Task() {
    Task TEMP;
    TEMP.task_ID= gen_ran_string(8, 1);
    TEMP.project_ID = gen_ran_string(8, 1);

    //TEMP.destination = gen_ran_string(rng() % 200 + 1 , 0);
    TEMP.destination = gen_ran_string(rng() % 20 + 1 , 0);

    auto date_fir = gen_ran_date();
    auto date_sec = gen_ran_date();

    TEMP.time_req_start_date = (date_fir < date_sec) ? date_fir : date_sec;
    TEMP.time_req_end_date = (date_fir > date_sec) ? date_fir : date_sec;

    auto time_fir = gen_ran_time();
    auto time_sec = gen_ran_time();

    TEMP.time_req_start_time = gen_ran_time();
    TEMP.time_req_end_time = gen_ran_time();

    if (date_fir == date_sec) {
        TEMP.time_req_start_time = (time_fir < time_sec) ? time_fir : time_sec;
        TEMP.time_req_end_time = (time_fir > time_sec) ? time_fir : time_sec;

    }

    TEMP.status = gen_ran_status();
    TEMP.highlight = gen_ran_string(1 , 0).c_str()[0];

    return TEMP;
}



int main() {

    int32_t choose = 0;
    int32_t count = 5;

    while (choose < 1 || choose > 5) {
        std::cerr << "----------MEAU----------" << std::endl;
        std::cerr << "1) UserData" << std::endl;
        std::cerr << "2) Stuff" << std::endl;
        std::cerr << "3) Event" << std::endl;
        std::cerr << "4) Project" << std::endl;
        std::cerr << "5) Task" << std::endl;
        std::cerr << "------------------------" << std::endl;

        std::cerr << "Please enter the number: ";
        std::cin >> choose;
    }

    std::cerr << "Please enter the count: ";
    std::cin >> count;



    //Choose

    for (int32_t i = 0 ; i < count ; ++i) {
        switch (choose) {
            case 1:
                gen_ran_UserData().print();
                break;
            case 2:
                gen_ran_Stuff().print();
                break;
            case 3:
                gen_ran_Event().print();
                break;
            case 4:
                gen_ran_Project().print();
                break;
            case 5:
                gen_ran_Task().print();
                break;
        }
        std::cout << std::endl;
    }

    return 0;
}


