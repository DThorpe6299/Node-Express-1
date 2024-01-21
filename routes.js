const express = require('express');
const router = new express.Router();
const axios = require('axios');
const app = require('./app')



router.post('/', async (req, res, next)=> {
    try {
        console.log('Reached this route!')
        const { developers } = req.body;
        if (!developers || !Array.isArray(developers)) {
            return res.status(400).json({ error: 'Invalid request body' });
        }
        //arrow function parameters need to be in parentheses.
        const results = await Promise.all(
            developers.map(async (username) => {
                try {
                    const response = await axios.get(`https://api.github.com/users/${username}`);
                    return { name: response.data.name, bio: response.data.bio };
                } catch (error) {
                    return { name: username, bio: 'Not Found' };
                }
            })
        );
      console.log(results)
      developers.push(...results);
      console.log(developers)
      let out = results.map((r) => ({ name: r.name, bio: r.bio }));
      console.log(out);

      //return the 201 successful post request status code.
      return res.status(201).send(JSON.stringify(out));
    } catch(err) {
      next(err);
    }
});

module.exports = router;