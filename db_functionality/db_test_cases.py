import db_functions
import time

test=db_functions.Db_stuff()

print("---------Check Word Test----------")
test_word="oblique"
for i in range(500):
    start=time.perf_counter()
    test_bool = test.check_word(test_word)
    print("%f" % (time.perf_counter()-start))
    if test_bool==False:
        print("----ERROR----")

print("--------Incomplete Word Test---------")
test_incomplete="engi"
for i in range(500):
    start=time.perf_counter()
    test_bool = test.incomplete_check(test_incomplete)
    print("%f" % (time.perf_counter()-start))
    if test_bool==False:
        print("----ERROR----")