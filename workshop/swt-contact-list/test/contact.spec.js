const test = require('tape')
const request = require('supertest')
const should = require('chai').should()
const app = require('../server')

function isField(t, contacts) {
    for (let i = 0; i < contacts.length; i++) {
        t.true(contacts[i].should.include.keys(["id", "name", "email", "phone", "url", "notes"]),
            "res.body[" + i + "] have all property.")
    }
}

test('GET /contects', function(t) {
    request(app).get('/contacts')
        // there should be 200 "OK"
        .expect(200)
        .then(function(res) {
            let contacts = res.body
            t.equal(12, contacts.length, "res.body has length is 12, when open /contects.")
            isField(t, contacts)
            t.end()
        })
})
test('GET /contects/:id', function(t) {
    request(app).get('/contacts/id')
        // there should be 200 "OK"
        .expect(200)
        .then(function(res) {
            let contacts = res.body
            t.equal(13, contacts.length, "res.body has length is 13, when open /contects/id.")
            isField(t, contacts)
            t.end()
        })
})
test('POST /contacts', (t) => {
    const obj = {
        id: 13,
        name: 'thakdanai chanklom',
        email: 'thakdanai@chanklom.com',
        phone: '086-222-5894',
        url: 'www.chanklom.com',
        notes: 'Do not trust anyone'
    }
    request(app).post('/contacts')
        .send(obj)
        .expect(201)
        .then((res) => {
            let contact = res.body
            t.equal(13, contacts.length, "there should has length at 13, when update contact.")
            t.equal(13, contacts[0].id, "id at position 0 should be 13.")
            t.equal('thakdanai chanklom', contacts[0].name, "name at position 0 should be thakdanai chanklom.")
            t.equal('thakdanai@chanklom.com', contacts[0].email, "email at position 0 should be thakdanai@chanklom.com.")
            t.equal('086-222-5894', contacts[0].phone, "phone at position 0 should be 086-222-5894.")
            t.equal('www.chanklom.com', contacts[0].url, "url at position 0 should be www.chanklom.com.")
            t.equal('Do not trust anyone.', contacts[0].notes, "Do not trust anyone.")
            t.end()
        })
})

test('PUT /contacts/:id', function(t) {
    const obj = {
        id: 12,
        name: 'Suphekiat Kiatkanya',
        email: 'suphakiat@localmail.com',
        phone: '082-222-2220',
        url: 'www.douchebag.com',
        notes: 'I don\'t seen anything'
    }

    request(app).put('/contacts/0')
        .send(obj)
        // there should be 200 "OK"
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
        })

    request(app).get('/contacts/')
        // there should be 200 "OK"
        .expect(200)
        .then(function(res) {
            let contacts = res.body
            t.equal(12, contacts.length, "there should has length at 12, when update contact.")
            t.equal(12, contacts[0].id, "id at position 0 should be 12.")
            t.equal('Suphekiat Kiatkanya', contacts[0].name, "name at position 0 should be Suphekiat Kiatkanya.")
            t.equal('suphakiat@localmail.com', contacts[0].email, "email at position 0 should be suphakiat@localmail.com.")
            t.equal('082-222-2220', contacts[0].phone, "phone at position 0 should be 082-222-2220.")
            t.equal('www.douchebag.com', contacts[0].url, "url at position 0 should be www.douchebag.com.")
            t.equal('I don\'t seen anything', contacts[0].notes, "notes at position 0 should be 'I don't seen anything'.")
            t.end()
        })
})